"use server";

import { Resend } from "resend";

const resend = new Resend("re_Y6zgo4Ad_9yN77TuHgtaQUTE3WuFMfLJ7");

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
    to: "pogibrogaming@gmail.com",
    subject: subject,
    reply_to: senderEmail,
    text: message,
  });
};
