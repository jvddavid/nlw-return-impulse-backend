/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
SubmitFeedbackUseCase.ts (c) 2022
Desc: description
Created:  2022-05-05T04:06:36.761Z
Modified: 2022-05-06T20:54:37.303Z
*/

import { MailAdapter } from "../adapters/mailAdapter"
import { FeedbacksRepository } from "../repositories/FeedbacksRepo"


interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepo: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) { }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type || !comment) {
      throw new Error('Invalid request')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot')
    }


    const feedback = await this.feedbackRepo.create({ type, comment, screenshot })


    await this.mailAdapter.sendMail({
      subject: `[${type.toUpperCase()}] Novo Feedback`,
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<p>Screenshot:</p>`,
        `<img style="width: 30%" src="${screenshot}" />`,
        '</div>'
      ].join('\n'),
    })
    return feedback
  }
}
