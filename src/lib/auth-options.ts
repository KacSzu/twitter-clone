import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user, profile }) {
      if (user) token.user = user;
      if (profile) token.profile = profile;

      return token;
    },
    session({ session, token, user }) {
      if (session.user)
        session.user = {
          ...session.user,
          username: (token.profile as any).login,
          id: token.sub,
        } as any;
      return session;
    },
  },
};
