import {NextFunction, Request, Response} from "express";

import {smsService} from "../services";
import {smsTemplate} from "../helpers";
import {SmsActionTypeEnum} from "../enums";

class TwilioController {

    async send(req: Request, res: Response, next: NextFunction) {
        try {
            const name = "Teodor";
            const phone = "+380980277331";

            await smsService.sendSms(smsTemplate[SmsActionTypeEnum.WELCOME](name), phone);

            res.json("OK");
        } catch (e) {
            next(e);
        }
    }
}

export const twilioController = new TwilioController();
