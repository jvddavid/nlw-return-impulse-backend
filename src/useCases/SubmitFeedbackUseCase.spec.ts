import { NodeMailerMailAdapter } from "../adapters/nodemailer/NodeMailerMailAdapter"
import { PrismaFeedbackRepository } from "../repositories/prisma/PrismaFeedbackRepository"
import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
SubmitFeedbackUseCase.spec.ts (c) 2022
Desc: description
Created:  2022-05-05T04:38:33.832Z
Modified: 2022-05-05T05:03:00.519Z
*/

const createSubmitSpy = jest.fn().mockResolvedValue(Promise.resolve({
  id: '1',
  type: 'bug',
  comment: 'bug comment',
  screenshot: 'screenshot',
}))

const sendMailSpy = jest.fn().mockResolvedValue(Promise.resolve())

const submitFeedbackUseCase = new SubmitFeedbackUseCase({
  create: createSubmitSpy,
}, {
  sendMail: sendMailSpy,
})


describe('SubmitFeedback', () => {
  it('should be able to submit a feedback', async () => {
    const feedbackData = {
      type: 'bug',
      comment: 'bug comment',
      screenshot: 'data:image/png;base64,screenshot',
    }
    const feedback = submitFeedbackUseCase.execute(feedbackData)

    await expect(feedback).resolves.not.toThrow()
    expect(createSubmitSpy).toHaveBeenCalledWith(feedbackData)
    expect(sendMailSpy).toHaveBeenCalled()
  })
  it('should be not able to submit a feedback without type', async () => {
    const feedbackData = {
      type: '',
      comment: 'bug comment',
      screenshot: 'data:image/png;base64,screenshot',
    }
    const feedback = submitFeedbackUseCase.execute(feedbackData)

    await expect(feedback).rejects.toThrow()
    expect(createSubmitSpy).not.toHaveBeenCalled()
    expect(sendMailSpy).not.toHaveBeenCalled()
  })
  it('should be not able to submit a feedback without comment', async () => {
    const feedbackData = {
      type: 'bug',
      comment: '',
      screenshot: 'data:image/png;base64,screenshot',
    }
    const feedback = submitFeedbackUseCase.execute(feedbackData)

    await expect(feedback).rejects.toThrow()
    expect(createSubmitSpy).not.toHaveBeenCalled()
    expect(sendMailSpy).not.toHaveBeenCalled()
  })
  it('should be not able to submit a feedback with an invalid screenshot', async () => {
    const feedbackData = {
      type: 'bug',
      comment: 'comment',
      screenshot: 'invalidScreenshot',
    }
    const feedback = submitFeedbackUseCase.execute(feedbackData)

    await expect(feedback).rejects.toThrow()
    expect(createSubmitSpy).not.toHaveBeenCalled()
    expect(sendMailSpy).not.toHaveBeenCalled()
  })
})
