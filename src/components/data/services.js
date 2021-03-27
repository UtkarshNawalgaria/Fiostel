import { FaWifi, FaToilet, FaTemperatureHigh, FaShower } from 'react-icons/fa';
import { GiTable } from 'react-icons/gi'
import { HiOutlineHome } from 'react-icons/hi'

export default [
  {
    title: 'Attached Washroom',
    icon: <FaToilet className="h-12 w-12"/>,
  },
  {
    title: 'Housekeeping',
    icon: <HiOutlineHome className="h-12 w-12"/>,
  },
  {
    title: 'Shower',
    icon: <FaShower className="h-12 w-12"/>,
  },
  {
    title: 'Hot Water',
    icon: <FaTemperatureHigh className="h-12 w-12"/>,
  },
  {
    title: 'Study Table',
    icon: <GiTable className="h-12 w-12"/>,
  },
  {
    title: 'Internet(Wi-fi)',
    icon: <FaWifi className="h-12 w-12"/>,
  },
];