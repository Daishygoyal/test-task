import { Router } from 'express';
import {
    getCountries
} from '../controller/countries.js';


const router = Router();

router.get('/countries', getCountries);

export default router;
