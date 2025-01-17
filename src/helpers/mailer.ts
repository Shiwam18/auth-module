
import nodemailer from "nodemailer";

export async function sendMail({email, emailType, userId}:any) {
    
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

        const mailOption = {
            from: 'yshiwam250@gmail.com', 
            to: email, 
            subject: emailType==="VERIFY"?"Verify your email":"Reset your password", 
            html: "<b>Hello world?</b>", 
        }

        const mailResponse = await transporter.sendMail(mailOption);
        return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
        
    }
}