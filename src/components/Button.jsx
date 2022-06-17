import Link from 'next/link'

const Button = ({ title = '', link = '', styles = '' }) => {
  return (
    <button className={styles}>
      <Link href={link}>
        <a>{title}</a>
      </Link>
    </button>
  )
}

export default Button
