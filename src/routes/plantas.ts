
import { Router } from 'express';
import { getTodosLosRiegos, registrarRiego } from '../firebase/realtimedb';

import dayjs  from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);


export const router = Router();


router.get('/plantas', (_req, res) => {
    res.json({
        message: 'List of plants'
    });
});

router.get('/riegos', async (_req, res) => {
    const resp = await getTodosLosRiegos();
    res.json({
        riegos: resp
    });
});

router.post('/resgistrarRiego', async(req, res) => {
    const { idPlanta, humedad } = req.body;
    const fechaRiego = dayjs().tz('America/Bogota').format(); // hora actual en Colombia
    console.log(idPlanta, fechaRiego,humedad);
    if (!idPlanta || !fechaRiego || !humedad) {
        res.status(400).json({
            message: 'Faltan datos para registrar el riego',
            idPlanta,
            fechaRiego,
            humedad
        });
        return;
    }

    const resp = await registrarRiego({idPlanta,fechaRiego,humedad});
    if (!resp) {
        res.status(500).json({
            message: 'Error al registrar el riego',
            idPlanta,
            fechaRiego,
            humedad
        });
        return;
    }
    res.json({
        message: 'Riego registrado',
        idPlanta,
        fechaRiego,
        humedad
    });
})