# cle-oidc-client

### Multicartshop Identity Service client TypeScript SDK

[![Stable Release](https://img.shields.io/npm/v/@cyberline-engineering/cle-oidc-client.svg)](https://npm.im/@cyberline-engineering/cle-oidc-client)

Library to provide OpenID Connect (OIDC) and OAuth2 protocol support for
client-side, browser-based JavaScript client applications. Also included is
support for user session and access token management.

This project based on
[authts/oidc-client-ts](https://github.com/authts/oidc-client-ts).

Implements the following OAuth 2.0 protocols and supports
[OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html):

-   [Authorization Code Grant](https://oauth.net/2/grant-types/authorization-code/)
    with [PKCE](https://oauth.net/2/pkce/)
-   [Refresh Token Grant](https://oauth.net/2/grant-types/refresh-token/)

**Additinal**

-   [Password Grant](https://oauth.net/2/grant-types/password/)
-   [Client Credentials Grant](https://oauth.net/2/grant-types/client-credentials/) for nodejs environment (not browser)

## Table of Contents

-   [Installation](#installation)
-   [Building the Source](#building-the-source)

## Installation

Using [npm](https://npmjs.org/)

```sh
$ npm install @cyberline-engineering/cle-oidc-client --save
```

## Building the Source

```sh
$ git clone https://github.com/@cyberline-engineering/cle-oidc-client.git
$ cd cle-oidc-client
$ npm install
$ npm run build
```

### Running the Tests

```sh
$ npm test
```
