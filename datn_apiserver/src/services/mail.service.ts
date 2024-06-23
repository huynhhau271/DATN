import nodemailer from "nodemailer";
import "dotenv/config";
import { BadRequestError } from "../utils/httpErrors";
class MailService {
    private transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // only for testing purposes, remove it for production
        },
        connectionTimeout: 60 * 1000 * 5, // 60 seconds timeout
    });

    async sendmail(to: string, subject: string, html: string) {
        await this.transporter
            .sendMail({
                to: to, // list of receivers
                from: process.env.MAIL_SENDER, // sender address
                subject: subject, // Subject line
                html: html, // HTML body content
            })
            .then(() => {
                console.log("send mail success");
            })
            .catch((er) => {
                console.log({ er });

                throw new BadRequestError("send mail failed");
            });
    }
}
export default new MailService();
