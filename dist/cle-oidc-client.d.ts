import { User } from 'oidc-client-ts';
import { UserManager } from 'oidc-client-ts';

export declare const AUTH_PROD_PATH = "https://identity.multicartshop.com";

export declare const AUTH_SANDBOX_PATH = "https://stage.identity.multicartshop.com";

export declare const DefaultMulticartOAuthConfig: MulticartOAuthConfiguration;

export declare const mergeScopes: (source?: string | string[], target?: string | string[]) => string;

export declare const MULTICART_CLIENT_ID = "Multicart.TypeScript.Client";

/**
 * Provides a higher level API for signing a user in, signing out, managing the user's claims returned from the OIDC provider,
 * and managing an access token returned from the OIDC/OAuth2 provider.
 *
 * @public
 */
export declare class MulticartOAuthClient extends UserManager {
    protected configuration: MulticartOAuthConfiguration;
    constructor(configuration?: MulticartOAuthConfiguration);
    signinPasswordGrant({ username, password, }: {
        username: string;
        password: string;
    }): Promise<User | null>;
    signinClientCredentials({ scopes, }?: {
        scopes?: string[];
    }): Promise<User>;
}

export declare class MulticartOAuthConfiguration {
    private configuration;
    constructor(configuration?: MulticartOAuthConfigurationParameters);
    set config(configuration: MulticartOAuthConfiguration);
    get sandbox(): boolean;
    get basePath(): string;
    get client_id(): string;
    get redirect_uri(): string;
    get logout_redirect_uri(): string;
    get client_secret(): string | undefined;
    get scopes(): string[] | undefined;
}

export declare interface MulticartOAuthConfigurationParameters {
    client_id?: string;
    redirect_uri?: string;
    logout_redirect_uri?: string;
    sandbox?: boolean;
    basePath?: string;
    client_secret?: string;
    scopes?: string[];
}


export * from "oidc-client-ts";

export { }
