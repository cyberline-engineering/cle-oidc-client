import { MulticartOAuthClient, MulticartOAuthConfiguration } from '../src/';

let client: MulticartOAuthClient;

beforeAll(() => {
    const config = new MulticartOAuthConfiguration({
        sandbox: true,
        redirect_uri: 'http://localhost:8899',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    });
    client = new MulticartOAuthClient(config);

    return client;
});

describe('OAuth client', () => {
    test('signin', async () => {
        const user = await client.signinClientCredentials({
            scopes: ['profile', 'email', 'openid'],
        });

        expect(user?.access_token).toBeDefined();
    });
});
