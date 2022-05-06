/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
prisma.ts (c) 2022
Desc: description
Created:  2022-05-05T01:04:55.803Z
Modified: 2022-05-05T01:05:17.595Z
*/

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"],
})
