
import { Router } from 'express';


export const router = Router();


router.get('/plantas', (_req, res) => {
    res.json({
        message: 'List of plants'
    });
});