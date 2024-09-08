import { CustomJwtPayload } from './jwt'; // Adjust the import path if needed
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: CustomJwtPayload; // or whatever type your `user` should have
  }
}