import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { QueryParams } from './types/types';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.get('/api/links', (req: Request, res: Response) => {
    const reqBody: QueryParams = req.body;
    res.send(reqBody);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
