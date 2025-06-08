import { ZodError } from 'zod';
import { Response } from 'express';

export function handleError(error: any, res: Response) {
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.errors.map(err => ({
                path: err.path.join('.'),
                message: err.message
            }))
        });
    }

    if (error instanceof Error && error.message.includes('already exists')) {
        return res.status(409).json({
            success: false,
            message: error.message
        });
    }

    console.error('Unhandled error:', error);
    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
}
