import {TokenPayload} from "./src/app/auth/TokenPayload";

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
