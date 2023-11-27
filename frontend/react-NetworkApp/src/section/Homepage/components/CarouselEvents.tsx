import React from "react";
import EventModel from "../../../Models/EventModel";
import { Link } from "react-router-dom";

export const CarouselEvents:  React.FC<{event: EventModel}> = (props) => {
  return (
    <div className="col-xs-6 col-sm col-md-4 col-lg-3 mb-3">
      <div className='text-center'>
                {props.event.img ? 
                    <img
                        src={props.event.img}
                        width='200'
                        height='233'
                        alt="event"
                    />
                    :
                    <img
                        src={require('./../../../Images/EventImages/book-luv2code-1000.png')}
                        width='200'
                        height='233'
                        alt="event"
                    />
                }
                <h6 className='mt-2'>{props.event.title}</h6>
                <p>{props.event.sponsor}</p>
                <Link className='btn main-color text-white' to={`ticket/${props.event.id}`}>Get Ticket</Link>
      </div>
    </div>
  );
};
