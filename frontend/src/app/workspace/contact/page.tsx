"use client";

import { sendEmail } from "@/app/actions";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="text-3xl font-semibold text-foreground items-center">
        Drop us a message
      </div>
      <div className=" items-center justify-center">
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">
            Thank you for getting in touch! We'll get back to you as soon as we
            are able.
          </p>
        ) : (
          <form
            style={{ minWidth: "400px", maxWidth: "400px" }}
            action={async (formData) => {
              await sendEmail(formData);
              setEmailSubmitted(true);
              toast.success("Email sent successfully!");
            }}
            className="flex flex-col gap-2 mt-10 justify-center items-center"
          >
            <div className="mb-2 w-full">
              <label
                htmlFor="email"
                typeof="email"
                className="text-white block  text-sm font-medium mb-2"
              >
                Your e-mail
              </label>
              <input
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder="Your email"
                className="bg-[#1819E] w-full border text-foreground border-[#33353F] rounded-lg  p-3"
              />
            </div>
            <div className="mb-2 w-full">
              <label
                htmlFor="subject"
                typeof="email"
                className="text-white w-full block text-sm font-medium mb-2"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#1819E] border text-foreground border-[#33353F] w-full rounded-lg p-2.5"
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                placeholder="Your message"
                required
                maxLength={5000}
                className="bg-[#1819E] border border-[#33353F] text-foreground w-full rounded-lg h-52 p-2.5"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-white group flex items-center justify-center gap-2 text-black font-medium py-2.5 px-5 rounded-lg transition-all"
              style={{ maxWidth: "120px" }}
            >
              Submit{""}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
