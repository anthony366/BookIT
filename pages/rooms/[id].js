import Head from "next/head";
import RoomFeatures from "@/components/room/RoomFeatures";
import styles from "@/styles/Home.module.scss";

const roomDetails = ({ room }) => {
  return (
    <>
      <Head>
        <title>{`${room.name} - BookIT `}</title>
      </Head>

      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>

        {room.images.map((image, index) => (
          <img
            key={index}
            className="card-img-top mx-auto"
            src={image.url}
            alt={room.name}
            priority="true"
          />
        ))}

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>
            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b> / night
              </p>

              <button className="btn btn-block py-3 booking-btn">Pay</button>
            </div>
          </div>
        </div>

        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>

          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <p className="review_user">by John</p>
            <p className="review_comment">Good Quality</p>

            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/rooms");
  const { data } = await res.json();

  const paths = data.map((room) => ({
    params: { id: room._id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/rooms/${id}`);
  const { data } = await res.json();

  return { props: { room: data } };
}

export default roomDetails;
