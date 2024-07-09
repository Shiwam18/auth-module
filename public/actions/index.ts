"use server"
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';
import { BiPhone } from 'react-icons/bi';


const prisma = new PrismaClient()

export const signup = async ({data}:any)  => {
  console.log(data.gender, "in the signup function");
  
  const user = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  });

    if (user) {
      throw new Error("User already exists");
      
    }

    try {
console.log(data.gender,"in the db  reate")

        const response = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          gender: data.gender,
          
        },
      })
      console.log(response, "this is response");
      return ({status:200})

    } catch (error:any) {
        console.log(error.message);
    }
}