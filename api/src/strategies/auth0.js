const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
  audience: 'https://www.tastybiteshub-api.com',
  issuerBaseURL: 'https://dev-qes4jwm0nrs4vzn6.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

module.exports = {
    jwtCheck
}