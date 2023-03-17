
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'production';
      VUE_APP_API_SCHEME: string;
      VUE_APP_API_HOST: string;
      VUE_APP_API_PORT: string;
      VUE_APP_API_SUBPATH: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }