import asyncHandler from "express-async-handler"; // instead of writing try/catches
import { generateToken } from "../utils/generateToken.js";
import sgMail from "@sendgrid/mail";

// @route       PUT /api/email/send
// @desc        Send email
// @access      Private
export const sendEmail = asyncHandler(async (req, res) => {
    const {
        message
    } = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'mikeev21@gmail.com', // Change to your recipient
        from: 'mikeev21@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: message,
        html: '<strong>Test from Stor</strong>'
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        })
});

export const sendResetPasswordEmail = asyncHandler(async (req, res) => {
    const user = req;
    const token = generateToken(user._id);
    const url = `${process.env.CLIENT_URL}/reset/${token}`;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'mikeev21@gmail.com', // Change to your recipient
        from: 'mikeev21@gmail.com', // Change to your verified sender
        subject: 'Stor reset password',
        html: `Hello ${user.first}, please reset your password by clicking <a href=${url}> here</a>`
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Reset Password Email Sent');
        })
        .catch((error) => {
            console.error(error);
        })
});

//https://stackoverflow.com/questions/71513412/how-do-i-properly-implement-the-email-verifcation-link-sent-to-user-to-work-in-n