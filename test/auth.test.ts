/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { MulticartOAuthClient, MulticartOAuthConfiguration } from '../src/';

describe('OAuth client', () => {
    test('signin client credentials', async () => {
        const config = new MulticartOAuthConfiguration({
            sandbox: true,
            redirect_uri: 'http://localhost:8899',
            scopes: ['profile', 'email', 'openid'],
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        });
        const client = new MulticartOAuthClient(config);

        const user = await client.signinClientCredentials();

        expect(user?.access_token).toBeDefined();
    });

    test('signin resource owner credentials', async () => {
        const config = new MulticartOAuthConfiguration({
            sandbox: true,
            redirect_uri: 'http://localhost:8899',
            scopes: ['profile', 'email', 'openid'],
        });
        const client = new MulticartOAuthClient(config);

        const user = await client.signinResourceOwnerCredentials({
            username: process.env.USER_NAME!,
            password: process.env.PASSWORD!,
        });

        expect(user?.access_token).toBeDefined();
    });
});
