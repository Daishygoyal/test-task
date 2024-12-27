import { Router } from 'express';
const router = Router();

import {
    getOptimal
} from '../controller/optimal.js';


router.get('/optimal', getOptimal);

export default router;
