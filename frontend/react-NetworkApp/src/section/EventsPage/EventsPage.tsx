import { useEffect, useState } from 'react';
import EventModel from '../../Models/EventModel';
import { SearchEvent } from './components/SearchEvents';
import { Pagination } from '../Utils/Pagination';

export const EventsPage = () => {

    const [events, setEvents] = useState<EventModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(5);
    const [totalAmountOfEvents, setTotalAmountOfEvents] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Event category');

    useEffect(() => {
        const fetchEvents = async () => {
            const baseUrl: string = "http://localhost:8080/api/events";

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${eventsPerPage}`;
            } else {
                url = baseUrl + searchUrl;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.events;

            setTotalAmountOfEvents(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

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
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${eventsPerPage}`)
        }
    }

    const categoryField = (value: string) => {
        
        if (
            value.toLowerCase() === 'JF' || 
            value.toLowerCase() === 'webinars' || 
            value.toLowerCase() === 'hack' || 
            value.toLowerCase() === 'SE' 
          
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=0&size=${eventsPerPage}`)
        } else {
            setCategorySelection('All');
            setSearchUrl(`?page=0&size=${eventsPerPage}`)
        }
    }

    const indexOfLastEvent: number = currentPage * eventsPerPage;
    const indexOfFirstEvent: number = indexOfLastEvent - eventsPerPage;
    let lastItem = eventsPerPage * currentPage <= totalAmountOfEvents ?
        eventsPerPage * currentPage : totalAmountOfEvents;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('JF')}>
                                        <a className='dropdown-item' href='#'>
                                            Job Fair
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('webinars')}>
                                        <a className='dropdown-item' href='#'>
                                           Webinars
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('meetup')}>
                                        <a className='dropdown-item' href='#'>
                                            Meetups
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('hack')}>
                                        <a className='dropdown-item' href='#'>
                                          Hackaton
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('SE')}>
                                        <a className='dropdown-item' href='#'>
                                         Social Event
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfEvents > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountOfEvents})</h5>
                            </div>
                            <p>
                                {indexOfFirstEvent + 1} to {lastItem} of {totalAmountOfEvents} items:
                            </p>
                            {events.map(event => (
                                <SearchEvent event={event} key={event.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}