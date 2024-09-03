import express from 'express';

const app = express();

app.get('/', (_, res) => {
    return res.send('Hello World!');
});

app.listen(8020, () => console.log('Listening on port 8020'));
