"use server";

import { Resend } from "resend";
const resend = new Resend("re_CoUHpMeE_9FSFPGxEBWqJd7eCpUZ73M6U");

export const sendEmail = async (formData: any) => {
  const message = formData.get("message");
  const subject = formData.get("subject");
  const senderEmail = formData.get("senderEmail");

  if (!message || !subject) {
    return {
      error: "Please fill in all of the fields",
    };
  }

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "gadorjani@windowslive.com",
    subject: subject,
    reply_to: senderEmail,
    text: message,
  });
};
