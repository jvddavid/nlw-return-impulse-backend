/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
FeedbacksRepo.ts (c) 2022
Desc: description
Created:  2022-05-05T03:58:23.162Z
Modified: 2022-05-05T04:16:31.849Z
*/

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface Feedback {
  id: string;
  type: string;
  comment: string;
  screenshot: string | null;
}

export interface FeedbacksRepository {
  create(feedbackData: FeedbackCreateData): Promise<Feedback>;
}
