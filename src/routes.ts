
import express from 'express'
import { NodeMailerMailAdapter } from './adapters/nodemailer/NodeMailerMailAdapter';

import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';

export const routes = express.Router()


routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodeMailerMailAdapter = new NodeMailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodeMailerMailAdapter)

  const feedback = await submitFeedbackUseCase.execute({ type, comment, screenshot })

  return res.status(201).json({ data: feedback })
})
