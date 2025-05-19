
import { config } from 'dotenv';

import admin from "firebase-admin"; // Importar admin de firebase-

 
config(); // Cargar variables de entorno desde el archivo .env


const firebaseConfig = {
  credential: admin.credential.cert(
    {
    projectId: process.env.project_id,
    privateKey: process.env.private_key,
    clientEmail: process.env.client_email,
  }
  ),
  apiKey: process.env.apiKey, 
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    
};
// Initialize Firebase
admin.initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const database = admin.database();