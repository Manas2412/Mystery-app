import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
    try {
        const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be seperated by '||'. These questions are for anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing insted on universal themes that encourages friendly interactions. For example, your output should be structured like this: 'What's a hobby you've always wanted to try but never did? || If you could travel anywhere in the world right now, where would you go and why? || What's a book or movie that had a significant impact on you and why?'. Ensure the questions are intriguing, foster meaningful conversations, and encourage creativity.";

        const result = streamText({
            model: openai("gpt-4o-mini"),
            prompt,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error("API Error:", error);

        return NextResponse.json(
            {
                error: error?.message ?? "Unknown error",
            },
            { status: 500 }
        );
    }
}
