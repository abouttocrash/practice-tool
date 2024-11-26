import express, {  Request, Response } from "express";
import cors from 'cors';

const app = express()
const allowedOrigins = ['http://localhost:3000','http://localhost:4200'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());
const port = 3000

app.get('/', (req:Request, res:Response) => {
    console.log("????")
    res.status(200).send(":)))")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
