import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

import { QueryParams, RequestLinks } from './types/types';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getRequest = async (
    query: string,
    height: number,
    depth: number,
    rDepth: number,
    rLinks: RequestLinks[]
) => {
    try {
        const response = await axios.get(
            `https://en.wikipedia.org/w/api.php?action=parse&page=${query}&format=json`
        );
        const wiki = response.data;
        const regex =
            /href="\/wiki\/(?!(File:|([^"]*)_\(disambiguation\)))([^"]*)"/g;
        const result = wiki.parse.text['*'].match(regex);

        for (let i = 0; i < height; i++) {
            const link = result[i].replace(`href="/wiki/`, '').slice(0, -1);
            rLinks.push({
                link,
                subLinks: [],
            });
            if (rDepth - 1 > 0) {
                await getRequest(
                    link,
                    height,
                    depth,
                    rDepth - 1,
                    rLinks[rLinks.length - 1].subLinks
                );
            }
        }
    } catch (err) {
        console.error(err);
    }
};

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.get('/api/links', async (req: Request, res: Response) => {
    const reqBody: QueryParams = req.body;
    const links: RequestLinks[] = [];
    if (reqBody.query.length > 0 && reqBody.height < 5 && reqBody.depth < 5) {
        await getRequest(
            reqBody.query,
            reqBody.height,
            reqBody.depth,
            reqBody.depth,
            links
        );
    }
    res.send(links);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
