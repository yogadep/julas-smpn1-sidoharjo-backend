import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt.utils";
import { handleError } from "../utils/errorHandler";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      userId?: string; 
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "Authentication token is required", statusCode: 401 });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token); // { id, username, role }
    req.user = decoded;

    if (!decoded?.id) {
      res.status(401).json({ success: false, message: "Invalid token: user id missing", statusCode: 401 });
      return;
    }
    req.userId = String(decoded.id);

    next();
  } catch (error) {
    handleError(error, res);
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ success: false, message: "Forbidden: Admin access required", statusCode: 403 });
    return;
  }
  next();
};

export const authorizeAnyRole = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthenticated', statusCode: 401 });
    return;
  }
  next();
};
