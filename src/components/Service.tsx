import React from 'react'
import { FaShower, FaTemperatureHigh, FaToilet, FaWifi } from 'react-icons/fa'
import { GiTable } from 'react-icons/gi'
import { HiOutlineHome } from 'react-icons/hi'

const Service = ({
  icon,
  isSmall = false,
}: {
  icon: string
  isSmall?: boolean
}) => {
  const style = isSmall ? 'h-5 w-5' : 'h-12 w-12'

  if (icon == 'toilet') {
    return <FaToilet className={style} />
  }

  if (icon == 'housekeeping') {
    return <HiOutlineHome className={style} />
  }

  if (icon == 'shower') {
    return <FaShower className={style} />
  }

  if (icon == 'temperature') {
    return <FaTemperatureHigh className={style} />
  }

  if (icon == 'study') {
    return <GiTable className={style} />
  }

  if (icon == 'internet') {
    return <FaWifi className={style} />
  }

  return null
}

export default Service
