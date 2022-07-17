import React from 'react'
import { GrFacebook, GrTwitter, GrInstagram, GrYoutube } from 'react-icons/gr'

const Socials = ({ icon, style }: any) => {
  if (icon == 'facebook') {
    return <GrFacebook style={style} />
  }

  if (icon == 'twitter') {
    return <GrTwitter style={style} />
  }

  if (icon == 'instagram') {
    return <GrInstagram style={style} />
  }

  if (icon == 'youtube') {
    return <GrYoutube style={style} />
  }

  return null
}

export default Socials
