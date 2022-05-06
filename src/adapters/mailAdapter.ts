/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
mailAdapter.ts (c) 2022
Desc: description
Created:  2022-05-05T04:21:42.704Z
Modified: 2022-05-05T04:22:52.695Z
*/

export interface SendMailData {
  subject: string
  body: string
}


export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<any>;
}
