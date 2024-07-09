// import { EmailTemplate } from '@/app/components/email-template';
// import Email from '@/email/welcome';
// import { NextApiRequest } from 'next';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);




// export async function POST(req:any) {
//   try {
//     const {body} = await req;
//     const userEmail = body.email;
//     const email=await req.email
//     console.log(userEmail ,await req, "in the postemail");
  
//     await resend.emails.send({
//       from: 'onboarding@resend.com',
//       to: userEmail,
//       subject: 'verification email',
//       react: Email(),
//     });
//   } catch (error:any) {
//     console.log(error.message);
    
//   }


// }