import express from 'express';
import { APP_PORT } from './config';
import { register, user } from './routes';

const app = express();

app.use(express.json());

app.use(register);
app.use(user);

app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
