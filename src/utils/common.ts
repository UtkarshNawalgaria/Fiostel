export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export async function modifyRoomData(data: any) {
  const rooms = data.map((room: any) => {
    return {
      ...room,
      costPerDay: room.costPerDay.toNumber()
    }
  })

  return rooms
}
