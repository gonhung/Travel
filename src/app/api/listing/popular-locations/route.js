import Abu_dhabi from "../../../../../public/assets/AbuDhabi.jpg"
import Dubai from "../../../../../public/assets/dubai.jpg"
import Berlin from "../../../../../public/assets/berlin.jpg"
import Hamburg from "../../../../../public/assets/hamburg.jpg"
import Paris from "../../../../../public/assets/paris.jpg"
import St_tropez from "../../../../../public/assets/StTropez.jpg"
import Mumbai from "../../../../../public/assets/Mumbai.jpg"
import Delhi from "../../../../../public/assets/Delhi.jpg"
import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req){
    try {
    const abudhabi_listings = await db.listing.count({
        where: {
            location: "abu-dhabi"
        }
    })

    const dubai_listings = await db.listing.count({
        where: {
            location : "dubai"
        }
    })

    const mumbai_listings = await db.listing.count({
        where: {
            location : "mumbai"
        }
    })

    const delhi_listings = await db.listing.count({
        where: {
            location : "delhi"
        }
    })


    const berlin_listings = await db.listing.count({
        where: {
            location : "berlin"
        }
    })

    const hamburg_listings = await db.listing.count({
        where: {
            location : "hamburg"
        }
    })

    const st_tropez_listings = await db.listing.count({
        where: {
            location : "st_tropez"
        }
    })
    

    const paris_listings = await db.listing.count({
        where: {
            location : "paris"
        }
    })

    const results = [
        {
            numOfPlace: abudhabi_listings,
            image: Abu_dhabi,
            value: "abu-dhabi"
        },
         {
            numOfPlace: dubai_listings,
            image: Dubai,
            value: "dubai"
        },
         {
            numOfPlace: mumbai_listings,
            image: Mumbai,
            value: "mumbai"
        },
         {
            numOfPlace: delhi_listings,
            image: Delhi,
            value: "delhi"
        },
         {
            numOfPlace: berlin_listings,
            image: Berlin,
            value: "berlin"
        },
         {
            numOfPlace: hamburg_listings,
            image: Hamburg,
            value: "hamburg"
        },
         {
            numOfPlace: st_tropez_listings,
            image: St_tropez,
            value: "st-tropez"
        },
         {
            numOfPlace: paris_listings,
            image: Paris,
            value: "paris"
        },
    ]

    const sortedResults = results.sort((a,b) => b.numOfPlace).slice(0,4)

    return NextResponse.json(sortedResults)
    } catch (error) {
        return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
    }
}