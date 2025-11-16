import AXIOS_API from "@/utils/axiosAPI";

export async function getFilteredListings(values){
    const url = `/listing/filter?location=${values.location}&min_price=${values.min_price}&max_price=${values.max_price}&type=${values.type}`
    const {data} = await AXIOS_API.get(url)

    try {
        if(data) {
        const blurredImages = await Promise.all(
            data.map((listing) => AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`))
            
        )
        const filteredHotels = blurredImages.map((img, idx)=> {
            const blurredImages = img.data
            const currentHotel = data[idx]

            return { ...currentHotel, blurredImages}
        })
        console.log('filteredHotels', filteredHotels)
        return filteredHotels
    }
    } catch (error) {
        console.log(error)   
    }

}