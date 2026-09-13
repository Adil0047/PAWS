import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rating, role, message } = body;

    if (!name || !rating || !message) {
      return NextResponse.json(
        { error: "Name, rating, and message are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await db.review.create({
      data: {
        name: String(name),
        rating: Number(rating),
        role: role ? String(role) : null,
        message: String(message),
        approved: false,
      },
    });

    return NextResponse.json({ success: true, id: review.id, review });
  } catch (error) {
    console.error("Review submission failed:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const onlyApproved = searchParams.get("approved") === "true";

    const reviews = await db.review.findMany({
      where: onlyApproved ? { approved: true } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
