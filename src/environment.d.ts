declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RAINWAY_API_KEY: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
