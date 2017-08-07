export const environment = {
  production: true,
  apiUrl: '//aglplusapi.azurewebsites.net/api',
  authConfig: {
    clientID: 'woqYSkllsVa7ehYTfwRsTm0MQXUyVwmx',
    domain: 'auth-agl-plus.au.auth0.com',
    responseType: 'id_token token',
    audience: 'https://auth-agl-plus.au.auth0.com/userinfo',
    redirectUri: 'https://aglplus-ui-demo.azurewebsites.net/authorize',
    scope: 'openid email profile',
    nonce: '6766380992235423'
  }
}
