
const { useState } = React

export function LongTxt({ txt, length = 100 }) {

    const [isOpen, setIsOpen] = useState(false)

    if(txt.length <=length) return <section>{txt}</section>
    return (
        <section>
            {!isOpen && txt.substring(0,length) + '...'}
            {/* {!isOpen && txt.split(' ').filter((word, idx) => idx <= length).join(' ') + '...'} */}
            {isOpen && txt}
            <button onClick={() => { setIsOpen(prev => !prev) }}>
                {(!isOpen) ? 'Read More' : 'Read Less'}
            </button>
        </section>
    )
}