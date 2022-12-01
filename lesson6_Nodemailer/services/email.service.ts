import nodemailer, {SentMessageInfo} from "nodemailer";
import EmailTemplate from "email-templates";
import * as path from "path";

import {config, EmailActionEnum, emailInfo} from "../configs";

class EmailService {
    async sendEmail(userMail: string, emailAction: EmailActionEnum, locals: object = {}): Promise<SentMessageInfo> {
        const transporter = nodemailer.createTransport({
            from: 'No reply',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_PASSWORD
            }
        });

        const {subject, templateName} = emailInfo[emailAction];

        const templateRenderer = new EmailTemplate({
            views: {
                root: path.join(process.cwd(), 'email-templates'),
            }
        });

        Object.assign(locals, {frontendURL: 'https://www.google.com/'});

        const html = await templateRenderer.render(templateName, locals);

        return transporter.sendMail({
            to: userMail,
            subject,
            html
        });
    }
}

export const emailService = new EmailService();
