import { Carousel } from "./components/Carousel";
import { ExploreTopEvents } from "./components/ExporeTopEvents";
import { ReviewYourUpcoming } from "./components/ReviewYourUpcoming";



export const HomePage = () => {
    return (
        <>
      <ExploreTopEvents/>
      <ReviewYourUpcoming/>
      <Carousel/>
        </>
    );
}