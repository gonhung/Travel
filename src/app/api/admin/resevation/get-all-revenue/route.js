import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(rep) {
    try {
        await isAdminUser()

        const allReservations = await db.reservation.findMany({
            include : {
                listing : true
            }
        })

         if(allReservations.length === 0 ) return NextResponse.json(0)

            const allReservationPrices = allReservations.map((reservation) => {
                return reservation.daysDifference * reservation.listing.pricePerNight
            })

            const totalRevenue = allReservationPrices.reduces((a,b)=> a + b)

            return NextResponse.json(totalRevenue)
    } catch (error) {
        return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
    }
}