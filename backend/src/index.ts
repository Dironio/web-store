import express from 'express';
import { config } from 'dotenv';
import rootRouter from './routers';

config({ path: './.env' });

const PORT = process.env.PORT || 1488;

const app = express();
app.use(express.json());
// app.use()

app.use('/api', rootRouter);




function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT} port`)
        })
    } catch (e: any) {
        console.log('Error start: ', e.message);
        process.exit(1);
    }

}

start();