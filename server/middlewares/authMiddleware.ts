import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { CustomJwtPayload } from './jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = verifyToken(token) as CustomJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeReceptionist =  (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role != "Receptionist") {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

export const authorizeAdmin =  (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role != "Admin") {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
