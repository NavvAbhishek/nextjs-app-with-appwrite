//? Better in server side way
//!domain.com/verifytoken/assasasdfdgfdffg
//? Better in client side way
//!domain.com/verifytoken?token=adadfdf

import User from '@/models/userModel'
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4193bcb5025562",
                pass: "3cc4267edfef48"
            }
        })

        const mailOptions = {
            from: "abhii@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to 
            $ {emailType === "VERIFY ? "Verify your email" : "Reset your password"}</p>`
        }

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}