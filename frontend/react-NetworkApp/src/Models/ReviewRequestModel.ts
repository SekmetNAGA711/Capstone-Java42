class ReviewRequestModel {
    rating: number;
    eventId: number;
    reviewDescription?: string;

    constructor(rating: number, eventId: number, reviewDescription: string) {
        this.rating = rating;
        this.eventId = eventId;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewRequestModel;