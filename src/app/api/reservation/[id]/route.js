import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";

export async function DELETE(req, ctx){
    try {
        const { id } = ctx.params;

        const currentUser = await getCurrentUser()

        const reservation = await db.reservation.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        })

        if(reservation.user.id !== currentUser.id && !currentUser.isAdmin){
            return NextResponse.error({
                message: " User has no permissions to cancel the reservation"
            })
        }

        await db.reservation.delete({
            where : {id}
        })

        return NextResponse.json({message: " Successfully deleted reservation with id of " + id}, { status: 200})
    } catch (error) {
        return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
    }
}