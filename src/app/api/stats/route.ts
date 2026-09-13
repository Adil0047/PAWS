import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get real counts from the database
    const orderModel = (db as unknown as { order?: { count: () => Promise<number> } }).order;
    const contactModel = (db as unknown as { contact?: { count: () => Promise<number> } }).contact;
    const reviewModel = (db as unknown as { review?: { count: () => Promise<number> } }).review;
    const newsletterModel = (db as unknown as { newsletter?: { count: () => Promise<number> } }).newsletter;
    const referralModel = (db as unknown as { referral?: { count: () => Promise<number> } }).referral;

    const [
      totalOrders,
      totalMessages,
      totalReviews,
      totalSubscribers,
      totalReferrals,
    ] = await Promise.all([
      orderModel?.count() ?? Promise.resolve(0),
      contactModel?.count() ?? Promise.resolve(0),
      reviewModel?.count() ?? Promise.resolve(0),
      newsletterModel?.count() ?? Promise.resolve(0),
      referralModel?.count() ?? Promise.resolve(0),
    ]);

    // "Live orders" = orders created in the last 24 hours (in-progress activity)
    // Plus a base of 47 to simulate ongoing orders being worked on
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const recentOrders = await (db as unknown as {
      order?: { count: (args: unknown) => Promise<number> };
    }).order?.count({
      where: { createdAt: { gte: yesterday } },
    }) ?? 0;

    const liveOrders = 47 + recentOrders;

    return NextResponse.json({
      liveOrders,
      totalOrders,
      totalMessages,
      totalReviews,
      totalSubscribers,
      totalReferrals,
      recentOrders24h: recentOrders,
      status: "online",
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({
      liveOrders: 47,
      totalOrders: 0,
      totalMessages: 0,
      totalReviews: 0,
      totalSubscribers: 0,
      totalReferrals: 0,
      recentOrders24h: 0,
      status: "online",
    });
  }
}
