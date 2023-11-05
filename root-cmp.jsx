import { AboutUs } from './pages/AbousUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { HomePage } from './pages/homePage.jsx'

const { useState } = React

export function App() {

    const [page, setPage] = useState('BookIndex')
    const pages = ['HomePage', 'AboutUs', 'BookIndex']


    return <section className="app">
        <header className="app-header">
            <h1>My App</h1>
            {pages.map(page => <a key={page} onClick={() => {
                setPage(page)
            }}>{page}</a>)}
        </header>

        <main className="container">
            {page === 'HomePage' && <HomePage />}
            {page === 'AboutUs' && <AboutUs />}
            {page === 'BookIndex' && <BookIndex />}
        </main>
    </section>
}