import express from 'express';
import cors from 'cors';
import { loadData } from './dataPipeline.js';
import userRoutes from './routes/user.routes.js';
import dataRoutes from './routes/data.route.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', userRoutes);
app.use('/api/data', dataRoutes);
app.use(errorHandler);


const SPREADSHEET_ID = process.env.SPREADSHEET_ID; 
const RANGE = 'Sheet3!A2:I'; 

loadData(SPREADSHEET_ID, RANGE)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(console.error);
