import express, {  Request, Response } from "express";
import { stringSimilarity } from "string-similarity-js";
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';
import moment, { Moment } from "moment";



import { JSONFilePreset } from 'lowdb/node'
import { Requirement, Step, Tag, Test } from "../types/Types";

type Data = {
  reqs: Requirement[]
  tests: any[]
  steps: Step[],
  tags:Tag[]
}
const defaultData: Data = { reqs: [],tests:[],steps:[],tags:[] }
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

app.get('/test', async(req:Request, res:Response) => {
    let tests = await db.data.tests.map(t=>{
      return {uuid:t.uuid,name:t.name,stepCount:t.steps.length}
    })
    res.status(200).send({status:"SUCCESS",data:tests})
})
app.post('/requirement', async (req:Request, res:Response) => {
    console.log(req.body)
    req.body.uuid = uuidv4();
    await db.update(({ reqs }) => reqs.push(req.body))
    res.set("body",)
    res.status(200).send({status:"CREATED",data:req.body})
})
app.get('/requirement', async (req:Request, res:Response) => {
  let reqs = await db.data.reqs
  res.status(200).send({status:"SUCCESS",data:reqs})
})
app.post('/tag', async (req:Request, res:Response) => {
    console.log(req.body)
    req.body.uuid = uuidv4();
    await db.update(({ tags }) => tags.push(req.body))
    res.status(200).send({status:"CREATED",data:req.body})
})

app.get('/tag', async(req:Request, res:Response) => {
  let tags = await db.data.tags
  res.status(200).send({status:"SUCCESS",data:tags})
})

app.post('/test', async (req:Request, res:Response) => {
  const timeNow: Moment = moment();
    req.body.uuid = uuidv4();
    let steps:{uuid:string,testId:string}[] = []
    for(let i = 0;i <req.body.steps.length;i++){
      let s = req.body.steps[i]
      s.uuid = uuidv4();
      s.testId = req.body.uuid
      steps.push({uuid:s.uuid,testId:s.testId})
      await db.update(({ steps }) => steps.push(s))
    }
    const test:Test = {
      uuid:req.body.uuid,
      steps:steps,
      req_id:req.body.req_id,
      name:req.body.name,
      priority:req.body.priority,
      tags:[],
      created:timeNow.format(moment.defaultFormat)
    }
    await db.update(({tests }) =>tests.push(test))
    res.status(200).send({status:"CREATED",data:req.body})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
