import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthed } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, academicLevel, documentType, pages, deadline, price, message, preferredWriter } = body;

    if (!name || !email || !phone || !documentType || !pages || !deadline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await db.order.create({
      data: {
        name: String(name),
        email: String(email),
        phone: String(phone),
        academicLevel: String(academicLevel || "undergraduate"),
        documentType: String(documentType),
        pages: Number(pages),
        deadline: String(deadline),
        price: Number(price) || 0,
        message: message ? String(message) : null,
        preferredWriter: preferredWriter ? String(preferredWriter) : null,
      },
    });

    return NextResponse.json({ success: true, id: order.id, order });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Admin-only: list all orders
  if (!isAdminAuthed(req.headers.get("cookie"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
