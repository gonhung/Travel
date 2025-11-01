import db from "@/lib/db";
import { calcAndSorListings } from "@/lib/sortListings";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const { searchParams } = new URL(req.url)

        const location = searchParams.get("location")
        const min_price = searchParams.get("min_price")
        const max_price = searchParams.get("max_price")
        const type = searchParams.get("type")

        const listings = await db.listing.findMany({
            where : {
                pricePerNight: {
                    gte: min_price,
                    lte: max_price
                },
                location,
                type
            }
        })

        const sortListings = calcAndSorListings(listings)

        return NextResponse.json(sortListings)
    } catch (error) {
        return NextResponse.error(error)
    }
}