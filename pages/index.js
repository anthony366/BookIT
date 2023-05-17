import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import RoomItem from "@/components/room/RoomItem";
import Pagination from "@/components/Pagination";
import { paginate } from "@/utils/paginate";
import styles from "@/styles/Home.module.scss";

export default function Home({ rooms }) {
  const router = useRouter();
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  let { location, page = 1 } = router.query;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

  const paginateRooms = paginate(rooms, currentPage, pageSize);

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Rooms in ${location}` : "All Rooms"}
        </h2>

        <Link href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </Link>
        <div className="row">
          {paginateRooms && paginateRooms.length === 0 ? (
            <div className="alert alert-danger">
              <strong>Sorry, no rooms available!</strong>
            </div>
          ) : (
            paginateRooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      <div className="d-flex justify-content-center">
        <Pagination
          items={rooms.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

Home.getInitialProps = async (currentPage) => {
  const res = await fetch(
    `http://localhost:3000/api/rooms?page=${currentPage}`
  );
  const { data } = await res.json();

  return { rooms: data };
};
