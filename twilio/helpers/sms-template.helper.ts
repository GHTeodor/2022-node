import {SmsActionTypeEnum} from "../enums";

export const smsTemplate = {
    [SmsActionTypeEnum.WELCOME]:
        (name: string): string =>
            `Hi ${name}, welcome on our platform!`,

    [SmsActionTypeEnum.FORGOT_PASS]:
        (name: string): string =>
            `Hi ${name}, check email!`,
};
