import RoomItem from "./room/RoomItem";

const Home = ({ rooms }) => {
  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stay in New York</h2>

      <a href="#" className="ml-2 back-to-search">
        <i className="fa fa-arrow-left"></i> Back to Search
      </a>
      <div className="row">
        {rooms.map((room) => (
          <RoomItem key={room._id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default Home;
