import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, passwor } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username already taken"
            }, {
                status: 400,
            })
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({
            email,
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserVerifiedByEmail) {
            if (existingUserVerifiedByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email already registered and verified",
                }, {
                    status: 400,
                })
            }else{
                //update existing user
                const hashedPassword = await bcrypt.hash(passwor, 10);
                existingUserVerifiedByEmail.password = hashedPassword;
                existingUserVerifiedByEmail.verifyCode = verifyCode;
                existingUserVerifiedByEmail.verifyCodeExpires = new Date(Date.now()+3600000);//1 hour
                await existingUserVerifiedByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(passwor, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpires: expiryDate,
                isVerified: false,
                isAcceptipngMessages: true,
                messages: [],
            })

            await newUser.save();
        }

        //send Verification Email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message,
            }, {
                status: 500,
            })
        }

        return Response.json({
            success: true,
            message: "User registered successfully. Verification email sent."
        }, {
            status: 201,
        })

    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}