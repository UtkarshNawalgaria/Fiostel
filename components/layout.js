import Footer from './footer'
import Navbar from './Navbar'

const Layout = ({ children }) => {
    return (
        <>
            <header className="p-3 border-b-2">
                <Navbar />
            </header>

            <main>
                {children}
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout