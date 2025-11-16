import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser()

        const getAllReservations = await db.reservation.findMany({
            include: {
                listing: true,
                user: true
            }
        })
        console.log('getAllReservations', getAllReservations);
        const allReservationsTotalPrice = getAllReservations.map((reservation) => {
            return {
                ...reservation,
                totalPrice: reservation.daysDifference * reservation.listing.pricePerNight
            }
        })

        return NextResponse.json(allReservationsTotalPrice)
    } catch (error) {
        console.log('get errr', error)
        return NextResponse.json(
        { message: error.message || "Internal Server Error" },
        { status: 500 }
        );
    }
}
  