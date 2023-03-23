import * as dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (data) => {
  const mail = { ...data, from: "bazaley-dmitriy@i.ua" };

  await sgMail.send(mail);
};
