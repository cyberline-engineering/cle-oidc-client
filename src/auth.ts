import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import { mergeScopes } from './utils';

export const AUTH_SANDBOX_PATH = 'https://stage.identity.multicartshop.com';
export const AUTH_PROD_PATH = 'https://identity.multicartshop.com';
export const MULTICART_CLIENT_ID = 'Multicart.TypeScript.Client';

export interface MulticartOAuthConfigurationParameters {
    client_id?: string;
    redirect_uri?: string;

    sandbox?: boolean;
    basePath?: string;
    client_secret?: string;
    scopes?: string[];
}

export class MulticartOAuthConfiguration {
    constructor(
        private configuration: MulticartOAuthConfigurationParameters = {}
    ) {}

    set config(configuration: MulticartOAuthConfiguration) {
        this.configuration = configuration;
    }

    get sandbox(): boolean {
        return !!this.configuration.sandbox;
    }

    get basePath(): string {
        return this.configuration.basePath || this.sandbox
            ? AUTH_SANDBOX_PATH
            : AUTH_PROD_PATH;
    }

    get client_id(): string {
        return this.configuration.client_id || MULTICART_CLIENT_ID;
    }

    get redirect_uri(): string {
        return this.configuration.redirect_uri || this.basePath + '/login';
    }

    get client_secret(): string | undefined {
        return this.configuration.client_secret;
    }

    get scopes(): string[] | undefined {
        return this.configuration.scopes;
    }
}

export const DefaultMulticartOAuthConfig = new MulticartOAuthConfiguration();

/**
 * Provides a higher level API for signing a user in, signing out, managing the user's claims returned from the OIDC provider,
 * and managing an access token returned from the OIDC/OAuth2 provider.
 *
 * @public
 */
export class MulticartOAuthClient extends UserManager {
    constructor(protected configuration = DefaultMulticartOAuthConfig) {
        const umSettings: UserManagerSettings = {
            authority: configuration.basePath,
            loadUserInfo: true,
            client_id: configuration.client_id,
            redirect_uri: configuration.redirect_uri,
            client_secret: configuration.client_secret,
            scope: mergeScopes(configuration.scopes),
        };

        super(umSettings);
    }

    public async signinPasswordGrant({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) {
        const args = {
            extraQueryParams: { username, password, grant_type: 'password' },
        };

        return this.signinSilent(args);
    }

    public async signinClientCredentials({
        scopes,
    }: { scopes?: string[] } = {}) {
        const logger = this._logger.create('signinClientCredentials');
        const url = await this.metadataService
            .getTokenEndpoint()
            .catch((reason) => logger.error(reason));

        if (!url) {
            throw new Error('Token endpoint not be empty');
        }
        const {
            client_id,
            client_secret,
            scope: scopeInternal,
        } = this.settings;

        const scope = mergeScopes(scopeInternal, scopes);

        if (!client_secret) {
            throw new Error('No client_secret configured');
        }

        try {
            const r = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id,
                    client_secret,
                    scope,
                }).toString(),
                mode: 'cors',
            });
            const resp = await r.json();

            const user = new User(resp);
            user.expires_at =
                Math.floor(Date.now() / 1000) + (resp.expires_in ?? 0);

            await this.storeUser(user);
            logger.debug('user stored');
            this._events.load(user);
            return user;
        } catch (e) {
            logger.error(`Login failed`, e);
            throw new Error('Login failed');
        }
    }
}
