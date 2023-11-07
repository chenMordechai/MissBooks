import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from './BookDetails.jsx'
import {eventBusService} from "../services/event-bus.service.js"


const { useState, useEffect } = React
const {Link} = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())

    useEffect(() => {
        bookService.query(filterBy).then(setBooks)
    }, [filterBy])


    function onRemoveBook(bookId) {
        bookService.remove(bookId )
            .then(() => {
                 setBooks(books => books.filter(book => book.id !== bookId))
                 eventBusService.emit('user-msg', {txt:'Removed book'+ bookId , type:'success'})
                })
                .catch(err => {
                    console.log('err:', err)
                    eventBusService.emit('user-msg', {txt:'Failed removing book'+ bookId , type:'error'})
                })
    }

    function onSetFilter(filter) {
        setFilterBy((prevFilter => ({ ...prevFilter, ...filter })))
    }


    if (!books) return <div>Loading...</div>
    return (
        <section>
                <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <button><Link to="/book/edit">Add Book</Link></button>
                <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}
