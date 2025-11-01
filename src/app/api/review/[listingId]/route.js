import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req,ctx) {
    console.log('GET review')
    try {
        const { listingId } = ctx.params

        const listing = await db.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                reviews: true
            }
        })
        console.log('GET listing', listing);
         const reviewsIds = listing.reviews.map(({id})=> id)

         const review = await db.review.findMany({
            where: {
                id: {
                    in: reviewsIds
                }
            }, 
            include: {
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
         })

         return NextResponse.json(review, { status: 200})
    } catch (error) {
        console.error("Error creating listing:", error);
            return NextResponse.json(
              { message: error.message || "Internal Server Error" },
              { status: 500 }
            );
    }
}