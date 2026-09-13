import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthed } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthed(req.headers.get("cookie"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const chatModel = (db as unknown as {
      chatSession?: { findUnique: (args: unknown) => Promise<unknown> };
    }).chatSession;

    if (!chatModel) {
      return NextResponse.json({ error: "Chat sessions unavailable" }, { status: 503 });
    }

    const raw = (await chatModel.findUnique({ where: { id } })) as {
      id: string;
      visitorName: string;
      visitorEmail: string | null;
      messageCount: number;
      messages: string;
      createdAt: Date;
      updatedAt: Date;
    } | null;

    if (!raw) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    let messages: Array<{ id: string; sender: string; content: string; timestamp: number }> = [];
    try {
      messages = JSON.parse(raw.messages);
    } catch {
      messages = [];
    }

    return NextResponse.json({
      session: {
        id: raw.id,
        visitorName: raw.visitorName,
        visitorEmail: raw.visitorEmail,
        messageCount: raw.messageCount,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      messages,
    });
  } catch (error) {
    console.error("Failed to fetch chat session:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
