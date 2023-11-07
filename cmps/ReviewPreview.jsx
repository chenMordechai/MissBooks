

export function ReviewPreview ({review}){
    return (
        <section className="review-preview">
            <h2>{`${review.fullName} ${review.rate} Read at ${review.readAt}`} </h2>
        </section>
    )
}