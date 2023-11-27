import { Link } from "react-router-dom";

export const ExploreTopEvents = () => {
  return (
    <div className="p-3 mb-2 bg-dark header">
      <div
        className="container-fluid text-white 
        d-flex justify-content-center align-items-center"
        style={{ height: "80%" }}
      >
        <div >
          <h1 className="display-5 fw-bold" style={{ color: '#f6b092'}}>
            Explore Unforgettable Experiences
          </h1>
          <p
            className="col-md-8 fs-4"
            style={{
              fontSize: "1.5em",
              fontWeight: "bold",
              color: "#f2f2f2",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            Discover the world of Networking, One Journey at time 
          </p>
          <Link
            type="button"
            className="btn main-color btn-lg text-white"
            to="/search"
          >
            Exlore Top Events
          </Link>
        </div>
      </div>
    </div>
  );
};
