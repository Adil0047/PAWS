import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthed } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthed(req.headers.get("cookie"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const validStatuses = ["pending", "in-progress", "completed", "cancelled"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: " + validStatuses.join(", ") },
        { status: 400 }
      );
    }

    const existing = await db.order.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const updated = await db.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Order update failed:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await db.order.findUnique({ where: { id } });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthed(req.headers.get("cookie"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const existing = await db.order.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await db.order.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order deletion failed:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
