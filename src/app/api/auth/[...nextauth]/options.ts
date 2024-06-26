import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AdapterUser, { type User, NextAuthOptions } from "next-auth";

import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

type CustomUser = (User | typeof AdapterUser) & { photo: string | undefined }

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
                    photo: profile.avatar_url,
                };
            },
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
      }),
      // ...add more providers here
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google", profile);

                return {
                    ...profile,
                    id: profile.sub,
                    photo: profile.picture,
                };
            },
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                // console.log("JWT User", user);
                // console.log("JWT Token", token);
                // token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                // console.log("Session", session);
                // console.log("Session.User", session.user);
                // console.log("Session Token", token);
                // session.user.role = token.role;
            }
            return session;
        },
        // Use the signIn() callback to control if a user is allowed to sign in.
        async signIn({ user }) {
            
            // Save user data to the database
            if (user.email && user.name) {
                await prisma.user.upsert({
                    where: { email: user.email },
                    update: { 
                        name: user.name, 
                        photo: (user as CustomUser).photo
                    },
                    create: { 
                        email: user.email, 
                        name: user.name, 
                        photo: (user as CustomUser).photo,
                        tag: `${user.email.split('@')[0]}-${Math.floor(Math.random() * 1_000_000)}`,
                    },
                });
                await cleanup();
            }

            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
              return true
            } else {
              // Return false to display a default error message (can use to blocklist some emails)
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
  }
