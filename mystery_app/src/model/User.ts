import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document{
    content: String;
    createdAt: Date
}

const MessageSchema : Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export interface User extends Document{
    username: String;
    email: String;
    password: String;
    verifyCode: String;
    verifyCodeExpires: Date;
    isVerified: Boolean;
    isAcceptingMessages: Boolean;
    messages: Message[];
}

const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        required: [true,"username must be provided"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true,"Email must be provided"],
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/,"Email is invalid"]
    },
    password: {
        type: String,
        required: [true,"Password must be provided"],
        minlength: [6,"Password must be at least 6 characters"],
    },
    verifyCode: {
        type: String,
        required: [true,"Verify Code must be provided"],
    },
    verifyCodeExpires: {
        type: Date,
        required: [true,"Verify Code Expires must be provided"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: {
        type: [MessageSchema],
        default: []
    }
})

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",UserSchema);
export default UserModel;