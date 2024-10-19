import express from 'express';
import { fetchData } from '../controllers/data.controller.js';
const router = express.Router();

router.get('/', fetchData);

export default router;
