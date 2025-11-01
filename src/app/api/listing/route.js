import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import db from "@/lib/db"
import isAdminUser from "@/lib/isAdminUser";

export async function GET(req){
  try {
     const listing = await db.listing.findMany({
      take:10
     })

     return NextResponse.json(listing)
  } catch (error) {
    return NextResponse.error(error)
  }
}

export async function POST(req) {
  try {
    await isAdminUser()
    // const currentUser = await getCurrentUser();

    // if (!currentUser?.isAdmin) {
    //   return NextResponse.json(
    //     { message: "User must be an admin!" },
    //     { status: 403 }
    //   );
    // }

    const body = await req.json();

    // Kiểm tra các trường rỗng
    if (Object.values(body).some((v) => v === "")) {
      return NextResponse.json(
        { message: "Fill all fields!" },
        { status: 400 }
      );
    }

    const {
      name,
      location,
      desc,
      type,
      pricePerNight,
      beds,
      hasFreeWifi,
      imageUrls,
    } = body;

    const newListing = await db.listing.create({
      data: {
        name,
        location,
        desc,
        type,
        pricePerNight,
        beds,
        hasFreeWifi,
        imageUrls,
      },
    });

    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
