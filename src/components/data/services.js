import { FaWifi, FaToilet, FaTemperatureHigh, FaShower } from 'react-icons/fa';
import { GiTable } from 'react-icons/gi'
import { HiOutlineHome } from 'react-icons/hi'

export default [
  {
    title: 'Attached Washroom',
    icon: <FaToilet className="h-12 w-12" />,
    icon_small: <FaToilet className="h-7 w-7" />,
  },
  {
    title: 'Housekeeping',
    icon: <HiOutlineHome className="h-12 w-12" />,
    icon_small: <HiOutlineHome className="h-6 w-6" />,
  },
  {
    title: 'Shower',
    icon: <FaShower className="h-12 w-12" />,
    icon_small: <FaShower className="h-6 w-6" />,
  },
  {
    title: 'Hot Water',
    icon: <FaTemperatureHigh className="h-12 w-12" />,
    icon_small: <FaTemperatureHigh className="h-6 w-6" />,
  },
  {
    title: 'Study Table',
    icon: <GiTable className="h-12 w-12" />,
    icon_small: <GiTable className="h-7 w-7" />,
  },
  {
    title: 'Internet(Wi-fi)',
    icon: <FaWifi className="h-12 w-12" />,
    icon_small: <FaWifi className="h-6 w-6" />,
  },
];