import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import connectDB from "../../../config/db";
import User from "../../../models/User";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();

        //check user existence
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        if (!user) {
          throw new Error("No user found!");
        }

        //compare password
        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        //check for incorrect password
        if (!checkPassword || user.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(clientPromise),
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: "Uw3Zq8kwkIPSZZWSR+ayMkWKlV5CEsoxVOa9hddUBOY=",
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user?._id) token._id = user._id;
      if (user?.name) token.name = user.name;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
});
