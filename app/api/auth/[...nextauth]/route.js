
import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDb from '@/db/connectDb';

const authoptions= NextAuth({
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
      
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == "github"){
       await connectDb()
        const currentUser= await User.findOne({email:user.email})
        if(!currentUser){
          const newUser=await  User.create({
            email: user.email,
            username: user.email.split("@")[0],
          })
          user.name=newUser.username
        }

        return true
      }
    },
    async session({session,user,token}){
      const dbUser=await User.findOne({email: session.user.email})
      console.log(dbUser);
      
      session.user.name=dbUser.username
      return session;
    },
    
  }
})
export {authoptions as GET,authoptions as POST}