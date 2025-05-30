// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    JWT_SECRET?: string;
    SESSION_SECRET?: string;
    MONGO_URI?: string;
    NODE_ENV?: 'development' | 'production';
  }
}
