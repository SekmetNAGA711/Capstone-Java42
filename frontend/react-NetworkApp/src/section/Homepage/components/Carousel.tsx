import { CarouselEvents } from "./CarouselEvents";
import { useEffect, useState } from "react";
import EventModel from "../../../Models/EventModel";
import { Link } from "react-router-dom";


export const Carousel = () => {

  const [events, setEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);



  useEffect(() => {
    const fetchEvents = async () => {
        const baseUrl: string = "http://localhost:8080/api/events";

        const url: string = `${baseUrl}?page=0&size=9`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const responseJson = await response.json();

        const responseData = responseJson._embedded.events;

        const loadedEvents: EventModel[] = [];

        for (const key in responseData) {
            loadedEvents.push({
                id: responseData[key].id,
                title: responseData[key].title,
                sponsor: responseData[key].sponsor,
                description: responseData[key].description,
                quantity: responseData[key].quantity,
                eventAvailable: responseData[key].eventAvailable,
                category: responseData[key].category,
                img: responseData[key].img,
            });
        }

        setEvents(loadedEvents);
        setIsLoading(false);
    };
    fetchEvents().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
    })
}, []);

if (isLoading) {
  return (
      <div className="container m-5">
        <p>Loading..</p>
      </div>
  )
}

if (httpError) {
  return (
      <div className='container m-5'>
          <p>{httpError}</p>
      </div>
  )
}

  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Editors Choice Top Events for This Month</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
    d-none d-lg-block"
        data-bs-interval="false"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
            {events.slice(0, 3).map(event => (
                                <CarouselEvents event={event} key ={event.id} />
                            ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {events.slice(3, 6).map(event => (
                                <CarouselEvents event={event} key ={event.id} />
                            ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {events.slice(6, 9).map(event => (
                                <CarouselEvents event={event} key ={event.id} />
                            ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to= '/search'>View More</Link>
            </div>
      </div>
    </div>
  );
};
