const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-qes4jwm0nrs4vzn6.us.auth0.com/.well-known/jwks.json', // replace with your Auth0 domain
    }),
    audience: 'https://dev-qes4jwm0nrs4vzn6.us.auth0.com/api/v2/', // replace with your API audience
    issuer: 'https://nourkhansa7.auth0.com/', // replace with your Auth0 domain
    algorithms: ['RS256'],
});

module.exports = {
    jwtCheck
}