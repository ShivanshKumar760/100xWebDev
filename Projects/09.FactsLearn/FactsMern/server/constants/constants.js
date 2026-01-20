import dotenv from 'dotenv';

dotenv.config();

const PORT=process.env.DEV_PORT || 5000;

const MONGO_URI=process.env.MONGO_CLOUD_URL;


export {PORT,MONGO_URI};