import ShelfCurrentUpcomings from "../../../Models/ShelfCurrentUpcomings";

export const UpcomingsModal: React.FC<{ shelfCurrentUpcoming: ShelfCurrentUpcomings, returnEvent: any,
    renewUpcoming: any }> = (props) => {
    return (
        <div className='modal fade' id={`modal${props.shelfCurrentUpcoming.event.id}`} data-bs-backdrop='static' data-bs-keyboard='false' 
            aria-labelledby='staticBackdropLabel' aria-hidden='true' key={props.shelfCurrentUpcoming.event.id}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='staticBackdropLabel'>
                                Event Options
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='mt-3'>
                                    <div className='row'>
                                        <div className='col-2'>
                                            {props.shelfCurrentUpcoming.event?.img ?
                                                <img src={props.shelfCurrentUpcoming.event?.img} 
                                                    width='56' height='87' alt='Event'/>
                                                :
                                                <img src={require('./../../../Images/EventImages/book-luv2code-1000.png')} 
                                                    width='56' height='87' alt='Event'/>
                                            }
                                        </div>
                                        <div className='col-10'>
                                            <h6>{props.shelfCurrentUpcoming.event.sponsor}</h6>
                                            <h4>{props.shelfCurrentUpcoming.event.title}</h4>
                                        </div>
                                    </div>
                                    <hr/>
                                    {props.shelfCurrentUpcoming.daysLeft > 0 && 
                                        <p className='text-secondary'>
                                           Expires in {props.shelfCurrentUpcoming.daysLeft} days.
                                        </p>
                                    }
                                    {props.shelfCurrentUpcoming.daysLeft === 0 && 
                                        <p className='text-success'>
                                             Expires Today.
                                        </p>
                                    }
                                    {props.shelfCurrentUpcoming.daysLeft < 0 && 
                                        <p className='text-danger'>
                                            Expired by {props.shelfCurrentUpcoming.daysLeft} days.
                                        </p>
                                    }
                                    <div className='list-group mt-3'>
                                        <button onClick={() => props.returnEvent(props.shelfCurrentUpcoming.event.id)} 
                                           data-bs-dismiss='modal' className='list-group-item list-group-item-action' 
                                           aria-current='true'>
                                            Cancel Event
                                        </button>
                                        <button onClick={
                                            props.shelfCurrentUpcoming.daysLeft < 0 ? 
                                            (event) => event.preventDefault() 
                                            :
                                            () => props.renewUpcoming(props.shelfCurrentUpcoming.event.id)
                                        } 
                                            data-bs-dismiss='modal' 
                                            className={
                                                props.shelfCurrentUpcoming.daysLeft < 0 ? 
                                                'list-group-item list-group-item-action inactiveLink' : 
                                                'list-group-item list-group-item-action'
                                            }>
                                            {props.shelfCurrentUpcoming.daysLeft < 0 ? 
                                            'Late dues cannot be renewed' : 'Sign up for the next upcoming event'    
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
}