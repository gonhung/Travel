import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";
import { includes } from "zod";


export async function GET(req){
    try {
        await isAdminUser()

        const allListings = await db.listing.findMany({
            include: {
                reservations : true
            }
        })

        const mostReservedListing = allListings.reduce((a,b) => {
            return a?.reservation?.length >= b?.reservations.length? a : b
        })

        return NextResponse.json(mostReservedListing)
    } catch (error) {
        return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
        
    }
}