class EventModel {
    id: number;
    title: string;
    sponsor?: string;
    description?: string;
    quantity?: number;
    eventAvailable?: number;
    category?: string;
    img?: string;

    constructor (id: number, title: string, sponsor: string, description: string, 
        quantity: number, eventAvailable: number, category: string, img: string) {
            this.id = id;
            this.title = title;
            this.sponsor = sponsor;
            this.description = description;
            this.quantity = quantity;
            this.eventAvailable = eventAvailable;
            this.category = category;
            this.img = img;
    }
}

export default EventModel;