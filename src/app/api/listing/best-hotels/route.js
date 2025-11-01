import db from "@/lib/db";
import { calcAndSorListings } from "@/lib/sortListings"
import { NextResponse } from "next/server";

export async function GET(req)
{
    try {
         const listings = await db.listing.findMany({
            include: {
                review : true
            }
         })

         const sortListings = calcAndSorListings(listings).slice(0,4)
    } catch (error) {
        return NextResponse.error(error)
    }
}