"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: any) => {
  const message = formData?.get("message");
  const subject = formData?.get("subject");
  const senderEmail = formData?.get("senderEmail");

  if (!message || !subject) {
    return {
      error: "Please fill in all of the fields",
    };
  }

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "pogibrogaming@gmail.com",
    subject: subject,
    reply_to: senderEmail,
    text: message,
  });
};
