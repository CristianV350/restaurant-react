
export let shared = {
  env: {
    VUE_APP_DEBUG: '',
    VUE_APP_ISSUER: '',
    VUE_APP_CLIENT_ID: '',
    VUE_APP_API_SCHEME: process.env.VUE_APP_API_SCHEME || 'http',
    VUE_APP_API_HOST: process.env.VUE_APP_API_HOST || 'localhost',
    VUE_APP_API_PORT: process.env.VUE_APP_API_PORT,
    VUE_APP_API_SUBPATH: process.env.VUE_APP_API_SUBPATH || '/api'
  },
}