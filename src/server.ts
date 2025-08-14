import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userRouter from './router/user.routes';
import authRouter from './router/auth.routes';
import mapelRouter from './router/mapel.routes';
import kelasRouter from './router/kelas.routes';
import siswaRouter from './router/siswa.routes';
import jurnalRouter from './router/jurnal.routes';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-production-domain.com'] 
      : ['http://localhost:3000', 'http://localhost:5173'], 
    credentials: true, 
    optionsSuccessStatus: 204
  };

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', mapelRouter);
app.use('/api', kelasRouter);
app.use('/api', siswaRouter);
app.use('/api', jurnalRouter);

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
