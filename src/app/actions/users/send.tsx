"use server"
import { EmailTemplate } from '@/app/components/email-template';
import Email from '@/email/welcome';
import { NextApiRequest } from 'next';
import { Resend } from 'resend';
console.log(process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendEmail(email:string) {
    try {
      console.log(email,"in the email");
    
  const data=    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: "shiwamyadav264@gmail.com",
        subject: 'verification email',
        react: Email(),
      });
      console.log(data,"success!")
    } catch (error:any) {
      console.log(error.message,"pritning errror");
      
    }
  
  
  }