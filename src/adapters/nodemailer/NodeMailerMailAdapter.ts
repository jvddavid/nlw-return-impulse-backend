/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
NodeMailerMailAdapter.ts (c) 2022
Desc: description
Created:  2022-05-05T04:23:29.381Z
Modified: 2022-05-05T04:26:32.385Z
*/

import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f30f036a0e362e",
    pass: "fe10479e3f280b"
  }
});


export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    return await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'João Victor <j.victordavid2@gmail.com>',
      subject: data.subject,
      html: data.body,
      text: '',
    })
  }
}
