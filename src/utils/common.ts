export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export async function modifyRoomData(data: any) {
  const BASE_IMAGE_URL = 'https://cdn.sanity.io/images/wr1dsz0z/production'

  const rooms = data.map((room: any) => {
    const costPerMonth = room.costPerDay.toNumber() * 30
    const imagesWithUrl = room?.media?.images?.map((image: any) => {
      return {
        ...image,
        url: `${BASE_IMAGE_URL}/${image.publicId}`,
      }
    })
    delete room.costPerDay

    return {
      ...room,
      costPerMonth,
      media: {
        ...room.media,
        images: imagesWithUrl,
      },
    }
  })

  return rooms
}