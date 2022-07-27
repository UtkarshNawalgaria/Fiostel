import React from 'react'

type HeadingProps = {
  type: string
  title: string
  styles: string
}

export const Heading = ({ type, title, styles }: HeadingProps) => {
  let returnElement
  switch (type) {
    case 'h2':
      returnElement = <h2 className={styles}>{title}</h2>
      break
    case 'h3':
      returnElement = <h3 className={styles}>{title}</h3>
      break
    default:
      returnElement = <h1 className={styles}>{title}</h1>
  }
  return returnElement
}

export default Heading
