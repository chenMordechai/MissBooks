import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from './BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())

    useEffect(() => {
        bookService.query(filterBy).then(setBooks)
    }, [filterBy])


    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(books => books.filter(book => book.id !== bookId))
        })

    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(filter) {
        setFilterBy((prevFilter => ({ ...prevFilter, ...filter })))
    }


    if (!books) return <div>Loading...</div>
    return (
        <section>
            {!selectedBookId && <React.Fragment>
                <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <BookList books={books} onRemoveBook={onRemoveBook} onSelectBookId={onSelectBookId} />
            </React.Fragment>}
            {selectedBookId && <BookDetails bookId={selectedBookId} onSelectBookId={onSelectBookId} />}
        </section>
    )
}
