import Head from 'next/head'
import React, { useState } from 'react'
import { MdArrowRightAlt, MdEditCalendar } from 'react-icons/md'
import prisma from '../../../utils/prisma'
import { Prisma } from '@prisma/client'
import { DateRangePicker } from 'react-date-range'
import { addDays, differenceInDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

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
type TStay = Prisma.StayGetPayload<typeof stay>
type TRoom = Prisma.RoomGetPayload<typeof room> & costPerDay
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

const GST_RATE = 18
const RESERVATION_PERCENTAGE = 20

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
  }

  if (rooms.length == 0) {
    return <div>No Rooms Available</div>
  }

  return (
    <>
      <Head>
        <title>{stay.name}</title>
      </Head>
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
        <div className="room-list flex flex-col md:w-2/3">
          {/* Date Selection */}
          <div className="relative self-end mb-4">
            <div className="p-4 bg-gray-100 rounded-md mb-4 shadow-sm">
              <span
                className="font-bold mr-4 bg-white p-2 rounded-md shadow-sm cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {bookingData.dates.startDate.toDateString()}
              </span>
              <MdArrowRightAlt className="inline-block text-xl" />
              <span
                className="font-bold bg-white p-2 rounded-md shadow-sm cursor-pointer ml-4"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {bookingData.dates.endDate.toDateString()}
              </span>
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

          {/* Room List */}
          {rooms.map((room) => (
            <RoomsListItem
              key={room.slug}
              room={room}
              onRoomSelection={handleRoomSelection}
            />
          ))}
        </div>

        {/* Booking Summary */}
        <div className="hidden md:block md:w-1/3 md:border md:rounded-lg md:px-4">
          <div>
            <div className="text-center mb-10 pb-4 border-b">
              <h2 className="font-bold text-3xl pt-4">Booking Summary</h2>
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
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <div>
                  <MdEditCalendar className="text-8xl" />
                </div>
                <p>No Rooms Selected</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params

  const stay = await prisma.stay.findUnique({
    where: {
      slug: slug,
    },
    select: staySelectFields,
  })

  const rooms = await prisma.room
    .findMany({
      where: {
        stayId: stay?.id,
      },
      select: roomSelectFields,
    })
    .then((data) => {
      return data.map((room) => ({
        ...room,
        costPerDay: room.costPerDay.toNumber(),
      }))
    })

  return {
    props: {
      stay,
      rooms: rooms.length > 0 ? rooms : [],
    },
  }
}

export async function getStaticPaths() {
  const stays = await prisma.stay.findMany({
    select: {
      slug: true,
    },
  })

  const paths = stays?.map((stay) => ({
    params: { slug: stay.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default RoomList
