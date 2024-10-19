import express from 'express';
import { config } from 'dotenv';
import rootRouter from './routers';

config({ path: './.env' });

const PORT = process.env.PORT || 1488;

const app = express();

app.use('/api', rootRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})