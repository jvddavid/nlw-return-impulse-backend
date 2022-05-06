/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
PrismaFeedbackRepository.ts (c) 2022
Desc: description
Created:  2022-05-05T04:00:21.724Z
Modified: 2022-05-05T04:02:10.485Z
*/

import { prisma } from "../../prisma";
import { Feedback, FeedbackCreateData, FeedbacksRepository } from "../FeedbacksRepo";

export class PrismaFeedbackRepository implements FeedbacksRepository {
  create(feedbackData: FeedbackCreateData): Promise<Feedback> {
    return prisma.feedback.create({
      data: {
        type: feedbackData.type,
        comment: feedbackData.comment,
        screenshot: feedbackData.screenshot,
      },
    });
  }
}
