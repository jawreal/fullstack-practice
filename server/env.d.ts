// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    JWT_SECRET?: string;
    NODE_ENV?: 'development' | 'production';
  }
}
