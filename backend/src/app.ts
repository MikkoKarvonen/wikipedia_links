import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
