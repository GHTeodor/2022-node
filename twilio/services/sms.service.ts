import twilio from "twilio";

import {config} from "../configs";

const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID} = config;
class SmsService {
    public client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    async sendSms(message: string, phone: string) {
        try {
            console.log(`SMS start sending ~ number: ${phone}`)

            const smsResp = await this.client.messages.create({
                body: message,
                to: phone,
                messagingServiceSid: TWILIO_SERVICE_SID,
            });

            console.log(`SMS resp ~ status: ${smsResp.status}`)
        } catch (e: any) {
            console.error(`SMS service: ${e.message}`);
        }
    }
}

export const smsService = new SmsService();
