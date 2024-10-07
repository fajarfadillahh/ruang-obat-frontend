import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type UserLogin = {
  user_id: string;
  fullname: string;
  access_token: string;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 * 10,
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email" },
        password: { label: "password" },
        user_agent: { label: "user_agent" },
      },
      async authorize(credentials, req) {
        try {
          const response: SuccessResponse<UserLogin> = await fetcher({
            url: "/auth/login/users",
            method: "POST",
            data: credentials,
            user_agent: credentials?.user_agent,
          });

          return response.data;
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id;
        token.fullname = user.fullname;
        token.access_token = user.access_token;
      }
      return token;
    },

    session({ session, token }) {
      console.log("session has been executed");
      session.user.user_id = token.user_id;
      session.user.fullname = token.fullname;
      session.user.access_token = token.access_token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
