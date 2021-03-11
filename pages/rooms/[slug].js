import { useRouter } from 'next/router'


const SingleRoom = () => {

    const router = useRouter()
    const {slug} = router.query

    return (
        <div>
            <h1>{slug} Room</h1>
        </div>
    )
}

export default SingleRoom

// export async function getStaticPaths() {

// }

// export async function getStaticProps() {

// }