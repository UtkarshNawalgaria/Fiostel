import { GrFacebook, GrTwitter, GrInstagram, GrYoutube } from 'react-icons/gr'

export default [
  {
    id: 1,
    url: 'https://www.facebook.com',
    icon: (
      <GrFacebook
        style={{ height: 35, width: 35 }}
      />
    ),
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: (
      <GrTwitter
        style={{ height: 35, width: 35 }}
      />
    ),
  },
  {
    id: 3,
    url: 'https://www.instagram.com',
    icon: (
      <GrInstagram
        style={{ height: 35, width: 35 }}
      />
    ),
  },
  {
    id: 4,
    url: 'https://www.youtube.com',
    icon: (
      <GrYoutube
        style={{ height: 35, width: 35 }}
      />
    ),
  },
]
