import { Request, Response } from "express";
import { LoginSchema } from "../dto/login.validation";
import { handleError } from "../utils/errorHandler";
import { AuthService } from "../services/login.service";

// Initialize service
const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = LoginSchema.parse(req.body);
    const result = await authService.login(validatedData);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: result
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const logout = async (_req: Request, res: Response) => {
  // Untuk stateless JWT, server tidak perlu “hapus sesi”.
  // FE yang akan menghapus token. Endpoint ini sekadar memberi respons OK.
  res.status(200).json({
    success: true,
    message: 'Logout successful',
    statusCode: 200
  });
};

// export const getCurrentUser = async (req: Request, res: Response) => {
//   try {
//     // req.user is set by the auth middleware
//     if (!req.user?.id) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized',
//         statusCode: 401
//       });
//     }

//     const user = await authService.getCurrentUser(req.user.id);
    
//     res.status(200).json({
//       success: true,
//       message: 'Current user fetched successfully',
//       statusCode: 200,
//       data: user
//     });
//   } catch (error) {
//     handleError(error, res);
//   }
// };