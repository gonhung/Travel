import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
  try {
    const { id } = await ctx.params;

    const listing = await db.listing.findUnique({
      where: { id },
      include: {
        reviews: true,
        reservations: true,
      },
    });


    if (!listing) {
      // Nếu không tìm thấy thì trả về 404
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    const avgRating =
      listing.reviews?.length > 0
        ? listing.reviews.reduce((a, b) => a + b.stars, 0) /
          listing.reviews.length
        : 0;

    return NextResponse.json({
      ...listing,
      avgRating: Number(avgRating.toFixed(2)),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
