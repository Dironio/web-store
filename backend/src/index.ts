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
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port`)
    })

}

start();