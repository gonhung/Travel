import AXIOS_API from "@/utils/axiosAPI";
import { Ruthie } from "next/font/google";

export async function getBestHotels(){
    const {data} = await AXIOS_API.get('/listing/best-hotels')
    console.log('getBestHotels data', data)
    try {
        if(data){
        console.log('callll')
        const blurredImages = await Promise.all(
            data.map((listing) => AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`))

        )
        console.log('getBestHotels blurredImages', blurredImages)
        const bestHotels = blurredImages.map((img,idx)=>{
            const blurredImages =img.data
            const currentHotel = data[idx]

            return { ...currentHotel, blurredImages}
        })
        console.log('bestHotels',bestHotels)

        return bestHotels
    }
    } catch (error) {
     console.log(error)   
    }
}