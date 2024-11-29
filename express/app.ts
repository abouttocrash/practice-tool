import express, {  Request, Response } from "express";
import { stringSimilarity } from "string-similarity-js";
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';

import { JSONFilePreset } from 'lowdb/node'
import { Requirement } from "../types/Types";

type Data = {
  reqs: Requirement[]
  tests: any[]
  steps: any[]
}
const defaultData: Data = { reqs: [],tests:[],steps:[] }
const db = await JSONFilePreset<Data>('./express/db/db.json', defaultData)

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
app.post('/requirement', async (req:Request, res:Response) => {
    console.log(req.body)
    req.body.uuuid = uuidv4();
    await db.update(({ reqs }) => reqs.push(req.body))
    res.status(200).send({status:"CREATED",data:req.body})
})

app.post('/test', async (req:Request, res:Response) => {
    console.log(req.body)
    req.body.uuuid = uuidv4();
    // await db.update(({ tests }) => tests.push(req.body))
    res.status(200).send({status:"CREATED",data:req.body})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
