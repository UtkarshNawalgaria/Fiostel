import Link from 'next/link'

const Button = ({ title = '', link = '', styles = '' }) => {
  return (
    <button className={styles}>
      <Link href={link}>{title}</Link>
    </button>
  )
}

export default Button
