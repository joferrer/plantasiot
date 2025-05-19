
import {database as db} from './config';


interface Riego{ 
    idPlanta: string;
    fechaRiego: string;
    humedad: number;
}

const DB_REF_NOMBRE = 'riego';

export const registrarRiego = async (riego: Riego) => {
    const { idPlanta, fechaRiego, humedad } = riego;
    console.log("a: ",idPlanta, fechaRiego, humedad);
    const ref = db.ref(`${DB_REF_NOMBRE}`);
    return ref.push({
        idPlanta,
        fechaRiego,
        humedad
    }).then(()=>{
        console.log("Riego registrado en la base de datos");
        return Promise.resolve(true);
    })
    .catch((error) => {
        console.error("Error al registrar el riego:", error);
        return Promise.reject(false);
    }
    );
}

export const getTodosLosRiegos = async () => {
    const ref = db.ref(`${DB_REF_NOMBRE}`);
    return ref.once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            console.log("Todos los riegos obtenidos de la base de datos");
            return Promise.resolve(data);
        } else {
            console.log("No se encontraron riegos");
            return Promise.resolve(null);
        }
    }).catch((error) => {
        console.error("Error al obtener los riegos:", error);
        return Promise.reject(null);
    });
}

export const getRiegos = async (idPlanta: string) => {
    const ref = db.ref(`${DB_REF_NOMBRE}/${idPlanta}`);
    return ref.once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            console.log("Riegos obtenidos de la base de datos");
            return Promise.resolve(data);
        } else {
            console.log("No se encontraron riegos");
            return Promise.resolve(null);
        }
    }).catch((error) => {
        console.error("Error al obtener los riegos:", error);
        return Promise.reject(null);
    });
}