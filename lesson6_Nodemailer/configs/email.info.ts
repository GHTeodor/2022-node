import { EmailActionEnum } from './email-action.enum';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to nodemailer',
        templateName: 'welcome',
    },

    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Your password is under protect',
        templateName: 'forgot-password',
    },
};
