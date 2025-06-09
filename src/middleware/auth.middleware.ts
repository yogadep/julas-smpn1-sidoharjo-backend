import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { JwtPayload } from "../utils/jwt.utils";
import { handleError } from "../utils/errorHandler";

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication token is required',
        statusCode: 401
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    handleError(error, res);
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Forbidden: Admin access required',
      statusCode: 403
    });
    return;
  }
  next();
};