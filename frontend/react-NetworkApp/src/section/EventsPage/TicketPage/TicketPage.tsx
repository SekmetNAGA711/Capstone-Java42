import { useEffect, useState } from "react";
import EventModel from "../../../Models/EventModel";
import { StarsReview } from "../../Utils/StarsReview";
import { TicketandReviewBox } from "./TicketandReviewBox";
import ReviewModel from "../../../Models/ReviewModel";
import { LatestReviews } from "../LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../../Models/ReviewRequestModel";


export const TicketPage = () => {

    const { authState } = useOktaAuth();

    const [event, setEvent] = useState<EventModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // Reserved Count State
    const [currentReservedCount, setCurrentReservedCount] = useState(0);
    const [isLoadingCurrentReservedCount, setIsLoadingCurrentReservedCount] = useState(true);

    // Is ticket Reserved?
    const [isReserved, setIsReserved] = useState(false);
    const [isLoadingEventTicket, setIsLoadingEventTicket] = useState(true);

    const eventId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchEvent = async () => {
            const baseUrl: string = `http://localhost:8080/api/events/${eventId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedEvent: EventModel = {
                id: responseJson.id,
                title: responseJson.title,
                sponsor: responseJson.sponsor,
                description: responseJson.description,
                quantity: responseJson.quantity,
                eventAvailable: responseJson.eventAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };

            setEvent(loadedEvent);
            setIsLoading(false);
        };
        fetchEvent().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isReserved]);

    useEffect(() => {
        const fetchEventReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByEventId?eventId=${eventId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    event_id: responseData[key].eventId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchEventReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewEvent = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/reviews/secure/user/event/?eventId=${eventId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error('Something went wrong');
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewEvent().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [authState]);

    useEffect(() => {
        const fetchUserCurrentReservedCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/events/secure/currentcount/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: { 
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                     }
                };
                const currentReservedCountResponse = await fetch(url, requestOptions);
                if (!currentReservedCountResponse.ok)  {
                    throw new Error('Something went wrong!');
                }
                const currentReservedCountResponseJson = await currentReservedCountResponse.json();
                setCurrentReservedCount(currentReservedCountResponseJson);
            }
            setIsLoadingCurrentReservedCount(false);
        }
        fetchUserCurrentReservedCount().catch((error: any) => {
            setIsLoadingCurrentReservedCount(false);
            setHttpError(error.message);
        })
    }, [authState, isReserved]);

    useEffect(() => {
        const fetchUserReservedEvent = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/events/secure/reservedticket/byuser/?eventId=${eventId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const eventTicket = await fetch(url, requestOptions);

                if (!eventTicket.ok) {
                    throw new Error('Something went wrong!');
                }

                const eventTicketResponseJson = await eventTicket.json();
                setIsReserved(eventTicketResponseJson);
            }
            setIsLoadingEventTicket(false);
        }
        fetchUserReservedEvent().catch((error: any) => {
            setIsLoadingEventTicket(false);
            setHttpError(error.message);
        })
    }, [authState]);

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

    async function ticketEvent() {
        const url = `http://localhost:8080/api/events/secure/ticket/?eventId=${event?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const ticketResponse = await fetch(url, requestOptions);
        if (!ticketResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsReserved(true);
    }

    async function submitReview(starInput: number, reviewDescription: string) {
        let eventId: number = 0;
        if (event?.id) {
            eventId = event.id;
        }

        const reviewRequestModel = new ReviewRequestModel(starInput, eventId, reviewDescription);
        const url = `http://localhost:8080/api/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsReviewLeft(true);
    }

    return (
        <div className='flex-container'>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {event?.img ?
                            <img src={event?.img} width='349' height='349' alt='Event' />
                            :
                            <img src={require('./../../../Images/EventImages/book-luv2code-1000.png')} 
                                width='349'
                                height='349' alt='Event' />
                        }
                    </div>
                    <div className='col-3 col-md-4 container'style={{ backgroundColor:'#e3ded5', right: 130, paddingRight:10,  marginLeft: '220px', padding: '10px'}}>
                        <div className='ml-2'>
                            <h2>{event?.title}</h2>
                            <h5 className='text-primary'>{event?.sponsor}</h5>
                            <p className='lead'>{event?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <TicketandReviewBox event={event} currentReservedCount={currentReservedCount} isAuthenticated={authState?.isAuthenticated} isReserved={isReserved} ticketEvent={ticketEvent} isReviewLeft={isReviewLeft} submitReview={submitReview}/>
                </div>
                <hr />
                <LatestReviews reviews={reviews} eventId={event?.id} />
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center alighn-items-center'>
                    {event?.img ?
                        <img src={event?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../../Images/EventImages/book-luv2code-1000.png')} width='226'
                            height='349' alt='Event' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{event?.title}</h2>
                        <h5 className='text-primary'>{event?.sponsor}</h5>
                        <p className='lead'>{event?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <TicketandReviewBox event={event} currentReservedCount={currentReservedCount} isAuthenticated={authState?.isAuthenticated} isReserved={isReserved} ticketEvent={ticketEvent} isReviewLeft={isReviewLeft} submitReview={submitReview}/>
                <hr />
                <LatestReviews reviews={reviews} eventId={event?.id} />
            </div>
        </div>
    );
}
