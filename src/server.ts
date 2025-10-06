// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { connectDB } from './config/db';
// import userRouter from './router/user.routes';
// import authRouter from './router/auth.routes';
// import mapelRouter from './router/mapel.routes';
// import kelasRouter from './router/kelas.routes';
// import siswaRouter from './router/siswa.routes';
// import jurnalRouter from './router/jurnal.routes';
// import jadwalRouter from './router/jadwal.routes';

// dotenv.config(); 

// const app = express();
// const port = process.env.PORT || 3000;

// // CORS Configuration
// const corsOptions = {
//     origin: process.env.NODE_ENV === 'production' 
//       ? ['https://your-production-domain.com'] 
//       : ['http://localhost:3000', 'http://localhost:5173'], 
//     credentials: true, 
//     optionsSuccessStatus: 204
//   };

// app.use(cors(corsOptions));
// app.use(express.json());

// app.use('/api', userRouter);
// app.use('/api', authRouter);
// app.use('/api', mapelRouter);
// app.use('/api', kelasRouter);
// app.use('/api', siswaRouter);
// app.use('/api', jurnalRouter);
// app.use('/api', jadwalRouter);

// if (process.env.NODE_ENV !== 'production') {
//     const startServer = async (): Promise<void> => {
//         try {
//             await connectDB();
//             app.listen(port, () => {
//                 console.log(`App listening on port: ${port}`);
//             });
//         } catch (error: any) {
//             console.error(`Gagal terhubung ke server: ${error.message}`);
//         }
//     };

//     startServer();
// }

// export { app };

// server.ts
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
import jadwalRouter from './router/jadwal.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin(origin, cb) {
    const ok =
      !origin ||
      /^https?:\/\/localhost:(3000|5173)$/.test(origin || '') ||
      /\.vercel\.app$/.test(origin || '');
    cb(ok ? null : new Error('Not allowed by CORS'), ok);
  },
  credentials: true,
  optionsSuccessStatus: 204
}));
app.use(express.json());

// // (opsional tapi membantu cek cepat)
// app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', mapelRouter);
app.use('/api', kelasRouter);
app.use('/api', siswaRouter);
app.use('/api', jurnalRouter);
app.use('/api', jadwalRouter);

// HANYA listen saat dev
if (process.env.NODE_ENV !== 'production') {
  (async () => {
    try {
      await connectDB();
      app.listen(port, () => console.log(`App listening on port: ${port}`));
    } catch (error: any) {
      console.error(`Gagal terhubung ke server: ${error.message}`);
    }
  })();
}

export { app };


