import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }]
                    })

                    if (!user) {
                        throw new Error("Invalid email or username");
                    }

                    if (!user.isVerified) {
                        throw new Error("User not verified");
                    }
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password as string);

                    if (isPasswordValid) {
                        return user
                    } else {
                        throw new Error("Invalid password");
                    }
                } catch (err) {
                    throw new Error("Database connection error", err as Error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user){
                token.id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptipngMessages = user.isAcceptipngMessages;
                token.username = user.username;
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id = token.id as string;
                session.user.isVerified = token.isVerified as boolean;
                session.user.isAcceptipngMessages = token.isAcceptipngMessages as boolean;
                session.user.username = token.username as string;
            }
            return session
        }
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}