import { PrismaClient} from '@prisma/client';
import { Account, AuthOptions, Profile, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import { error } from 'console';
import jwt from 'jsonwebtoken';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";



const prisma=new PrismaClient();


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name:'credentials',

            credentials:{
                email: {
                    label:'Email',
                    type:'email',
                    placeholder:'Email',
                },
                password:{
                    label:'Password',
                    type:'password',
                    placeholder:'Password',
                }
            },

            authorize: async (credentials): Promise<any> => {
                if(!credentials){
                    return null;
                }

                const {email, password} = credentials;

                const user = await prisma.user.findUnique({
                    where:{
                        email,
                        password
                    },
                });

                if(!user) {
                    return null;
                }
                // const userPassword = user.password;

                // const isValidPassword = bcrypt.compareSync(password, userPassword);

                // if(!isValidPassword){
                //     return null;
                // }

                return user;

            }
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID ||"",
            clientSecret: process.env.GITHUB_SECRET || ""
          }),

          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ||""
          })


    ],

    // pages: {
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    // },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        async encode({secret, token}) {
            if(!token) {
                throw error("no token token to encode")
            }
            return jwt.sign(token, secret);
        },
        
        async decode({secret, token}){
            if(!token){
                throw error("no token to decode");
            }
            const decodedToken = jwt.verify(token, secret);
            if(typeof decodedToken === 'string'){
                return JSON.parse(decodedToken);
            }else{
                return decodedToken;
            }
        },
    },

    session: {
        strategy: 'jwt',
        maxAge: 30*24*60*60,
        updateAge: 24*60*60,
    },
    callbacks: {
        async session(params:{ session:Session; token:JWT; user:User}) {
            if(params.session.user) {
                params.session.user.email = params.token.email;
            }

            return params.session;
        },
        async jwt(params: {
            token:JWT;
            user?:User;
            account?:Account |null | undefined;
            profile?:Profile;
            isNewUser?:boolean;

        }) {

            if(params.user) {
                params.token.email = params.user.email;
            }
            return params.token;
        }
    }
        
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
