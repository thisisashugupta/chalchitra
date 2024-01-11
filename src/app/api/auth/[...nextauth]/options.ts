import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions : NextAuthOptions  = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            profile(profile) {
                console.log("Profile GitHub", profile);

                let userRole = "GitHub User";
                if(profile?.email == "adobeashu1812@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    role: userRole,
                };
            },
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
      }),
      // ...add more providers here
        GoogleProvider({
            profile(profile) {
                console.log("Profile GitHub", profile);

                return {
                    ...profile,
                    id: profile.sub,
                };
            },
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                console.log("JWT User", user);
                console.log("JWT Token", token);
                // token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                console.log("Session", session);
                console.log("Session.User", session.user);
                console.log("Session Token", token);
                // session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET!,
  }
