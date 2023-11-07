
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function onHandleChange({ target }) {
        const { name, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                console.log('hu')
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit((prev => ({ ...prev, [name]: value })))

    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <form onSubmit={onSubmitFilter} className="book-filter">
            <label htmlFor="title">Title</label>
            <input value={filterByToEdit.title} onChange={onHandleChange} type="text" id="title" name="title" placeholder="By Title" />
           
            <label htmlFor="price">Max Price</label>
            <input value={filterByToEdit.maxPrice} onChange={onHandleChange} type="number" id="maxPrice" name="maxPrice" placeholder="By Max Price" />

            <button>Set Filter</button>

        </form>
    )

}