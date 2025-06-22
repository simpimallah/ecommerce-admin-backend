import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import { AppDataSource } from './ormconfig';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));



AppDataSource.initialize()
  .then(() => {
    console.log('Connected to DB');
    app.use('/api/products', productRoutes);
    app.get('/', (_req, res) => {
      res.send('Backend is running 🚀');
     });
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('DB connection error:', err));
