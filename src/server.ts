/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
server.ts (c) 2022
Desc: description
Created:  2022-05-05T00:23:34.093Z
Modified: 2022-05-06T21:56:45.968Z
*/

import express from 'express'
import cors from 'cors'
import { routes } from './routes';

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333')
})
