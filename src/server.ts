import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRouter from './router/user.routes';
import authRouter from './router/auth.routes';
import mapelRouter from './router/mapel.routes';
import kelasRouter from './router/kelas.routes';

dotenv.config(); // Panggil di sini saja

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', mapelRouter);
app.use('/api', kelasRouter);

if (process.env.NODE_ENV !== 'production') {
    const startServer = async (): Promise<void> => {
        try {
            await connectDB();
            app.listen(port, () => {
                console.log(`App listening on port: ${port}`);
            });
        } catch (error: any) {
            console.error(`Gagal terhubung ke server: ${error.message}`);
        }
    };

    startServer();
}



export { app };
