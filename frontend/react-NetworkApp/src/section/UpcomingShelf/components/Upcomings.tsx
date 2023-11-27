import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShelfCurrentUpcomings from '../../../Models/ShelfCurrentUpcomings';
import { UpcomingsModal } from './UpcomingsModal';



export const Upcomings = () => {
    
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Loans
    const [shelfCurrentUpcomings, setShelfCurrentUpcomings] = useState<ShelfCurrentUpcomings[]>([]);
    const [isLoadingUserUpcomings, setIsLoadingUserUpcomings] = useState(true);
    const [ticket, setTicket] = useState(false);

    useEffect(() => {
        const fetchUserCurrentUpcomings = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/events/secure/currentupcomings`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentUpcomingsResponse = await fetch(url, requestOptions);
                if (!shelfCurrentUpcomingsResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelfCurrentUpcomingsResponseJson = await shelfCurrentUpcomingsResponse.json();
                setShelfCurrentUpcomings(shelfCurrentUpcomingsResponseJson);
            }
            setIsLoadingUserUpcomings(false);
        }
        fetchUserCurrentUpcomings().catch((error: any) => {
            setIsLoadingUserUpcomings(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, ticket]);

    if (isLoadingUserUpcomings) {
        return (
            <div className="container m-5">
              <p>Loading..</p>
            </div>
        )
      }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    async function returnEvent(eventId: number) {
        const url = `http://localhost:8080/api/events/secure/return/?eventId=${eventId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setTicket(!ticket);
    }

    async function renewUpcoming(eventId: number) {
        const url = `http://localhost:8080/api/events/secure/renew/upcoming/?eventId=${eventId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setTicket(!ticket);
    }
    
    return (
        <div>
            {/* Desktop */}
            <div className='d-none d-lg-block mt-2'>
                {shelfCurrentUpcomings.length > 0 ? 
                <>
                    <h5>Current Events: </h5>

                    {shelfCurrentUpcomings.map(shelfCurrentUpcoming => (
                        <div key={shelfCurrentUpcoming.event.id}>
                            <div className='row mt-3 mb-3'>
                                <div className='col-4 col-md-4 container'>
                                    {shelfCurrentUpcoming.event?.img ? 
                                        <img src={shelfCurrentUpcoming.event?.img} width='226' height='349' alt='Event'/>
                                        :
                                        <img src={require('./../../../Images/EventImages/book-luv2code-1000.png')} 
                                            width='226' height='349' alt='Event'/>
                                    }
                                </div>
                                <div className='card col-3 col-md-3 container d-flex'>
                                    <div className='card-body'>
                                        <div className='mt-3'>
                                            <h4>Event Options</h4>
                                            {shelfCurrentUpcoming.daysLeft > 0 && 
                                                <p className='text-secondary'>
                                                    Expires in {shelfCurrentUpcoming.daysLeft} days.
                                                </p>
                                            }
                                            {shelfCurrentUpcoming.daysLeft === 0 && 
                                                <p className='text-success'>
                                                    Expires Today.
                                                </p>
                                            }
                                            {shelfCurrentUpcoming.daysLeft < 0 && 
                                                <p className='text-danger'>
                                                    Past due by {shelfCurrentUpcoming.daysLeft} days.
                                                </p>
                                            }
                                            <div className='list-group mt-3'>
                                                <button className='list-group-item list-group-item-action' 
                                                    aria-current='true' data-bs-toggle='modal' 
                                                    data-bs-target={`#modal${shelfCurrentUpcoming.event.id}`}>
                                                        Manage Event
                                                </button>
                                                <Link to={'search'} className='list-group-item list-group-item-action'>
                                                    Search more Events?
                                                </Link>
                                            </div>
                                        </div>
                                        <hr/>
                                        <p className='mt-3'>
                                            Help other find their networking event by reviewing your event.
                                        </p>
                                        <Link className='btn btn-primary' to={`/ticket/${shelfCurrentUpcoming.event.id}`}>
                                            Leave a review
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <UpcomingsModal shelfCurrentUpcoming={shelfCurrentUpcoming} returnEvent={returnEvent} 
                                renewUpcoming={renewUpcoming}/>
                        </div>
                    ))}
                </> :
                <>
                    <h3 className='mt-3'>
                        Currently no loans
                    </h3>
                    <Link className='btn btn-primary' to={`search`}>
                        Search for a new book
                    </Link>
                </>
            }
          
            </div>
        </div>
    );
}