"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

async function EventFormMailer(form) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    let fullName = form.name + " " + form.surname;
    let mailOptions = {
      to: form.email,
      subject: form.subject,
      html: `<div style="background-color: #F0F0F0; padding: 25px 0; font-size: 15px; font-family: Georgia; line-height: 25px;">
          <div style="max-width: 600px; min-width: 300px: width: auto; margin: 0 auto; text-align: center;">
              <div style="text-align: left;">
                 <p>Thank you ${fullName} for joining our event.<br/>
                 Some informations about it are below.</p>
                 <p>
                  Title: "${form.formName}"<br/>
                  Date: ${form.date}
                  </p>
              </div>
          </div>
              </div>`,
    };
    let resp = transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return error;
      } else return true;
    });
    return resp;
  } catch (err) {
    return err;
  }
}

module.exports = EventFormMailer;
