import { Link } from "react-router-dom";
import EventModel from "../../../Models/EventModel";
import { LeaveAReview } from "../../Utils/LeaveAReview";
// import { LeaveAReview } from "../Utils/LeaveAReview";

export const TicketandReviewBox: React.FC<{ event: EventModel | undefined, 
    currentReservedCount: number, isAuthenticated: any, isReserved: boolean, 
    ticketEvent: any, isReviewLeft: boolean, submitReview: any }> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isReserved && props.currentReservedCount < 5) {
                return (<button onClick={() => props.ticketEvent()} className='btn btn-success btn-lg'>Checkout</button>)
            } else if (props.isReserved) {
                return (<p><b>Event Reserved. Enjoy!</b></p>)
            } else if (!props.isReserved) {
                return (<p className='text-danger'>Event not available to be reserved</p>)
            }
        }
        return (<Link to={'/login'} className='btn btn-success btn-lg'>Sign in</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return(
            <p>
                <LeaveAReview submitReview={props.submitReview}/>
            </p>
            )
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return(
            <p>
                <b>Thank you for your review!</b>
            </p>
            )
        }
        return (
        <div>
            <hr/>
            <p>Sign in to be able to leave a review.</p>
        </div>
        )
    }

    return (
        <div className= 'card col-3 container d-flex mb-5'>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentReservedCount}/5 </b>
                       Events Reserved
                    </p>
                    <hr />
                    {props.event && props.event.eventAvailable && props.event.eventAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.event?.quantity} </b>
                            Quantity
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.event?.eventAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    );
}