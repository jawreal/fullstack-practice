import "express-session"

declare module "express-session" {
  interface Session {
    isAuthenticated?: boolean;
    username?: string;
  }
}