import { Router } from 'express';
const router = Router();

import {
    getSalesRep
} from '../controller/salesrep.js';

router.get('/salesrep', getSalesRep);

export default router;
