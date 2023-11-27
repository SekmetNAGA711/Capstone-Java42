import { Link } from "react-router-dom";
import EventModel from "../../../Models/EventModel";


export const SearchEvent: React.FC<{ event: EventModel }> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.event.img ?
                            <img src={props.event.img}
                                width='323'
                                height='316'
                                alt='Event'
                            />
                            :
                            <img src={require('../../../Images/EventImages/book-luv2code-1000.png')}
                                width='323'
                                height='316'
                                alt='Event'
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.event.img ?
                            <img src={props.event.img}
                                width='323'
                                height='316'
                                alt='Event'
                            />
                            :
                            <img src={require('../../../Images/EventImages/book-luv2code-1000.png')}
                                width='323'
                                height='316'
                                alt='Event'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-4'style={{ backgroundColor:'#e3ded5', right: 130,  marginLeft: '170px'}}>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.event.sponsor}
                        </h5>
                        <h4>
                            {props.event.title}
                        </h4>
                        <p className='card-text'>
                            {props.event.description}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center' >
                    <Link className='btn btn-md main-color text-white' to={`/ticket/${props.event.id}`}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}