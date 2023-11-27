export const oktaConfig = {
    clientId: '0oadajykr4aspU1Mx5d7',
    issuer: 'https://dev-75793194.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}