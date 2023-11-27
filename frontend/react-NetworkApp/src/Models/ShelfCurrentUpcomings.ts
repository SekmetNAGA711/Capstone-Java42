import EventModel from "./EventModel";

class ShelfCurrentUpcomings {
    event: EventModel;
    daysLeft: number;

    constructor(event: EventModel, daysLeft: number) {
        this.event = event;
        this.daysLeft = daysLeft;
    }
}

export default ShelfCurrentUpcomings;