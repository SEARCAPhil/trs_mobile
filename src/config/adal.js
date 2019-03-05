export default {
  instance: 'https://login.microsoftonline.com/', 
  tenant: 'xxxxxxxxxx', //COMMON OR YOUR TENANT ID
  clientId: 'xxxxxxxx-xxxx-xxxx-xxxxxxxx', //This is your client ID
  redirectUri: `http://localhost/trs_mobile/www/#/auth`, //This is your redirect URI
  cacheLocation: 'localStorage',
  // callback: userSignedIn,
  popUp: true,
  endpoints : {"https://graph.microsoft.com": "https://graph.microsoft.com"},
}