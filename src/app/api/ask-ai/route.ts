// app/api/ask-ai/route.ts
import { NextResponse } from "next/server";
import { askGemini } from "../../../services/ai";

export async function POST(req: Request) {
  const { question } = await req.json();

  const answer = await askGemini(question);

  return NextResponse.json({ answer });
}
