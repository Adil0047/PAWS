import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const orders = await db.order.findMany({
      where: { email: email.toLowerCase() },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ orders, count: orders.length });
  } catch (error) {
    console.error("Failed to fetch orders by email:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
