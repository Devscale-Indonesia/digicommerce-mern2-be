import express from 'express';
import { connectDB } from './utils/mongo';

const app = express();

connectDB();

app.get('/', (_, res) => {
    return res.send('Hello World!');
});

app.listen(8020, () => console.log('Listening on port 8020'));
