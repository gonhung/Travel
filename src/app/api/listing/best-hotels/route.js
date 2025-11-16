import db from "@/lib/db";
import { calcAndSorListings } from "@/lib/sortListings"
import { NextResponse } from "next/server";

export async function GET(req)
{
    try {
         const listings = await db.listing.findMany({
            include: {
                reviews : true
            }
         })

         const sortListings = calcAndSorListings(listings).slice(0,4)
         console.log('sortListings', sortListings);
         return NextResponse.json(sortListings)
    } catch (error) {
        return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
    }
}