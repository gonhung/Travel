import db from "@/lib/db";
import { calcAndSorListings } from "@/lib/sortListings";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const { searchParams } = new URL(req.url)

        const location = searchParams.get("location")
        const min_price = Number(searchParams.get("min_price")) ?? 0
        const max_price = Number(searchParams.get("max_price")) ?? 0
        const type = searchParams.get("type")

        const listings = await db.listing.findMany({
            where : {
                pricePerNight: {
                    gte: min_price,
                    lte: max_price
                },
                location,
                type
            },
            include: {
                reviews: true
            }
        })

        const sortListings = calcAndSorListings(listings)

        return NextResponse.json(sortListings)
    } catch (error) {
        return NextResponse.error(error)
    }
}