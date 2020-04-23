import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

type EmailType = 'PHONE' | 'EMAIL';

export const generateSecret = (target: EmailType): string | void => {
  if (target === 'PHONE') {
    return Math.floor(Math.random() * 10000).toString()
  }
  if (target === 'EMAIL') {
    return Math.random().toString(36).substr(8)
  }

  return void 0
};

export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: 'noreply@magergram.com',
    to: address,
    subject: '🔐 Confirm Secret for Magergram',
    html: `Hello! Your confirm secret is <br />
          <span style="color:#000000;font-family:'arial' , 'tahoma' , 'helvetica' , sans-serif;font-size:32px;font-weight:bold;line-height:40px;text-align: center">${secret}</span><br/>
          <div style="font-size:8px;height:24px;line-height:24px">&nbsp;</div>
           Copy paste on the app/website to login`
  };
  return sendMail(email);
};
