import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";


export const ReviewYourUpcoming = () => {

    const { authState } = useOktaAuth();


    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Your All-in-One Hub for Professional Connections and Growth</h1>
                            <p className='lead'>
                               Conquer Your Career Goals with NetworkQuest -Find Networking Opportunities & Gain
                               Valuable Knowledge Easily.
                            </p>
                           

                               
                               {authState?.isAuthenticated ? 
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>See Your Upcoming Events </Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }  
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Unleash the Quest. Find, Experience, Repeat.</h1>
                            <p className='lead'>
                               NetworkQuest app helps to easily access all important networking events,
                               webinars, and Opportunities in one centralized location. Whether you're 
                               seeking to connect with like-minded professionals, explore new career paths,
                               or gain valuable knowledge, Network Quest is your one-stop hub to achieve your
                               career goals
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}