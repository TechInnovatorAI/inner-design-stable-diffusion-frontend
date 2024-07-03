export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth/signin',
  registerEndpoint: '/auth/signup',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  refreshEndpoint: '/auth/refresh',
  forgotpasswordEndpoint: '/auth/forgotpassword',
  resetpasswordEndpoint: '/auth/resetpassword',
  verifyemailEndpoint: '/auth/verifyemail'
}
