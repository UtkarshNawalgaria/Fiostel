'use client'

import { Prisma } from '@prisma/client'
import { addDays, differenceInDays } from 'date-fns'
import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { MdArrowRightAlt } from 'react-icons/md'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const GST_RATE = 18
const RESERVATION_PERCENTAGE = 20

const roomSelectFields = {
  id: true,
  slug: true,
  name: true,
  description: true,
  costPerDay: true,
  media: {
    include: {
      images: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  },
}

const staySelectFields = {
  id: true,
  slug: true,
  name: true,
  description: true,
  media: {
    include: {
      images: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  },
}

const stay = Prisma.validator<Prisma.StayArgs>()({
  select: staySelectFields,
})

const room = Prisma.validator<Prisma.RoomArgs>()({
  select: roomSelectFields,
})

type costPerDay = {
  costPerDay: number
}
export type TStay = Prisma.StayGetPayload<typeof stay>
export type TRoom = Prisma.RoomGetPayload<typeof room> & costPerDay

type TBookingData = {
  stay: string
  room?: TRoom
  duration: number
  roomTotal?: number
  subTotal?: number
  reservationTotal?: number
  tax?: number
  dates: {
    startDate: Date
    endDate: Date
    key: string
  }
}

const BookingSummary: React.FC<{ bookingData: TBookingData }> = ({
  bookingData,
}) => {
  return (
    <div>
      <div className="text-black font-semibold">
        <div className="flex justify-between mb-4">
          <div>
            {bookingData?.room?.name}{' '}
            <span className="text-sm text-gray-500">x 1</span>
          </div>
          {bookingData.duration > 0 ? (
            <div className="text-right">
              <span>₹ {bookingData?.roomTotal}</span>{' '}
              <span className="block font-normal text-sm text-gray-500">
                ({bookingData?.room?.costPerDay} x {bookingData.duration}{' '}
                nights)
              </span>
            </div>
          ) : (
            <span>Calculating...</span>
          )}
        </div>
        <div className="flex justify-between mb-4">
          <div>Tax (GST - {GST_RATE} %)</div>
          <div className="text-right">
            <span>₹ {bookingData?.tax}</span>{' '}
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div>Sub Total</div>
          <div className="text-right">
            <span>₹ {bookingData?.subTotal}</span>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div>Reservation Amount</div>
          <div>
            <span>{bookingData?.reservationTotal}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const RoomsListItem: React.FC<{
  room: TRoom
  onRoomSelection: (id: number) => void
}> = ({ room, onRoomSelection }) => {
  return (
    <div className="flex flex-col mb-10 md:flex-row">
      <div className="w-[300px]">
        <img
          src={room.media?.images[0].url ?? '/default-hostel-room.jpg'}
          alt={room.name}
          className="md:h-[200px] md:rounded-tl-lg md:rounded-bl-lg"
        />
      </div>
      <div className="w-full border-[#e7e7e7e] flex flex-col justify-between md:p-4 md:border-y md:border-r md:rounded-tr-lg md:rounded-br-lg">
        <div className="flex justify-between w-full">
          <h3 className="font-bold text-xl">{room.name}</h3>
          <div className="font-bold text-xl">Rs {room?.costPerDay}</div>
        </div>
        <div className="flex justify-end">
          <button
            className="inline-block cursor-pointer bg-[#facc15] text-white mt-4 font-semibold px-6 py-2 rounded-md hover:text-[#facc15] hover:bg-white border-2 border-[#facc15] focus:outline-none transition ease-in-out duration-100"
            onClick={() => onRoomSelection(room.id)}
          >
            <span>Book Room</span>
            <MdArrowRightAlt className="inline-block ml-2 text-xl" />
          </button>
        </div>
      </div>
    </div>
  )
}

const RoomList: React.FC<{ rooms: TRoom[]; stay: TStay }> = ({
  stay,
  rooms,
}) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [isRoomSelected, setIsRoomSelected] = useState(false)
  const [bookingData, setBookingData] = useState<TBookingData>({
    stay: stay.slug,
    duration: 1,
    tax: 0,
    roomTotal: 0,
    subTotal: 0,
    dates: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 2),
      key: 'selection',
    },
  })

  function handleDateRangeSelection(item: any) {
    const { startDate, endDate } = item.selection
    const bookingDays = differenceInDays(endDate, startDate)

    if (bookingDays > 0) setShowCalendar(false)

    const tax =
      (bookingDays * (bookingData.room?.costPerDay ?? 0) * GST_RATE) / 100
    const roomTotal = (bookingData.room?.costPerDay ?? 0) * bookingDays
    const subTotal = roomTotal + tax
    const reservationTotal = ((subTotal ?? 0) * RESERVATION_PERCENTAGE) / 100

    setBookingData((data) => {
      return {
        ...data,
        tax,
        roomTotal,
        subTotal,
        reservationTotal,
        duration: bookingDays,
        dates: {
          ...item.selection,
        },
      }
    })
  }

  function handleRoomSelection(id: number) {
    if (id === bookingData.room?.id) return

    setBookingData((data) => {
      const room = rooms.find((x) => x.id == id)
      const tax = (data.duration * (room?.costPerDay ?? 0) * GST_RATE) / 100
      const roomTotal = (room?.costPerDay ?? 0) * bookingData.duration
      const subTotal = roomTotal + tax
      const reservationTotal = ((subTotal ?? 0) * RESERVATION_PERCENTAGE) / 100

      return {
        ...data,
        tax,
        room,
        roomTotal,
        subTotal,
        reservationTotal,
      }
    })
    setIsRoomSelected(true)
    getRoomAvailability(id)
  }

  function getRoomAvailability(id: number) {
    if (!bookingData?.room) return

    return true
  }

  if (rooms.length == 0) {
    return <div>No Rooms Available</div>
  }

  return (
    <>
      <section className="mb-5 container mx-auto max-w-7xl md:my-10">
        <div>
          <img
            src={stay.media?.images[0].url}
            alt={stay.name}
            className="w-full h-[300px] md:h-[500px] object-cover md:rounded-lg"
          />
        </div>
        <div className="flex flex-col p-4 justify-between md:flex-row md:p-0">
          <div>
            <h1 className="text-5xl font-bold mt-5">{stay.name}</h1>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-7xl p-4 flex flex-col-reverse gap-4 md:flex-row md:my-10 md:p-0">
        {/* Room List */}
        <div className="room-list flex flex-col md:w-2/3">
          {rooms.map((room) => (
            <RoomsListItem
              key={room.slug}
              room={room}
              onRoomSelection={handleRoomSelection}
            />
          ))}
        </div>

        {/* Booking Summary */}
        <div className="hidden md:block md:w-1/3 md:border md:rounded-lg md:px-4 md:shadow-lg">
          <div>
            <div className="text-center mb-10 pb-4 border-b">
              {/* Date Selection */}
              <div className="relative self-end my-4">
                <div className="p-4 bg-gray-100 rounded-md mb-4 shadow-sm">
                  <div className="inline-block">
                    <div className="text-left uppercase text-sm mb-1">
                      Check In
                    </div>
                    <div
                      className="font-bold mr-4 bg-white p-2 rounded-md shadow-sm cursor-pointer"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      {bookingData.dates.startDate.toDateString()}
                    </div>
                  </div>
                  <MdArrowRightAlt className="inline-block text-xl" />
                  <div className="inline-block ml-4">
                    <div className="text-left uppercase text-sm mb-1">
                      Check Out
                    </div>
                    <div
                      className="font-bold bg-white p-2 rounded-md shadow-sm cursor-pointer"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      {bookingData.dates.endDate.toDateString()}
                    </div>
                  </div>
                </div>
                {showCalendar ? (
                  <div className="absolute -left-2/4 shadow-lg top-[95%]">
                    <DateRangePicker
                      months={2}
                      inputRanges={[]}
                      staticRanges={[]}
                      minDate={new Date()}
                      ranges={[bookingData.dates]}
                      date={addDays(new Date(), 1)}
                      direction="horizontal"
                      onChange={(item) => handleDateRangeSelection(item)}
                    />
                  </div>
                ) : null}
              </div>
              <p className="text-gray-500 font-bold mt-2">
                <span className="text-black">
                  {bookingData.duration} nights
                </span>{' '}
                starting from{' '}
                <span className="text-black">
                  {bookingData.dates.startDate.toDateString()}
                </span>
              </p>
            </div>
            {isRoomSelected ? (
              <div>
                <BookingSummary bookingData={bookingData} />
                <button className="mt-5 w-full px-6 py-4 bg-[#facc15] font-semibold rounded-md text-white">
                  Book Now
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}

export default RoomList
