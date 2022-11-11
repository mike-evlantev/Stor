import asyncHandler from "express-async-handler"; // instead of writing try/catches
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
        html: '<strong>Test from Stor</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error) => {
        console.error(error);
    })
});