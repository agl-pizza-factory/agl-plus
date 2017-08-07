export const environment = {
  production: false,
  apiUrl: '//aglplusapi.azurewebsites.net/api',
  authConfig: {
    clientID: 'woqYSkllsVa7ehYTfwRsTm0MQXUyVwmx',
    domain: 'auth-agl-plus.au.auth0.com',
    responseType: 'id_token token',
    audience: 'https://auth-agl-plus.au.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/authorize',
    scope: 'openid email profile',
    nonce: '6766380992235423'
  }
}
