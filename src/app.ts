import express, { Application } from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', eventRoutes);

export default app;