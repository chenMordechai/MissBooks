const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AboutUs } from './pages/AbousUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { Header } from './cmps/Header.jsx'

export function App() {



    return(
        <Router>
            <section className="app">
              <Header/>

              <main className="container">
                 <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/book" element={<BookIndex/>}/>
                    <Route path="/book/:bookId" element={<BookDetails/>}/>
                    <Route path="/book/edit" element={<BookEdit/>}/>
                    <Route path="/book/edit/:bookId" element={<BookEdit/>}/>
                </Routes>
                </main>
            </section>
        </Router>
    )
     
}