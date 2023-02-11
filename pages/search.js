import Head from "next/head";
import Search from "@/components/Search";

export default function searchIndex() {
  return (
    <>
      <Head>
        <title>Search Rooms</title>
      </Head>
      <Search />
    </>
  );
}

// searchIndex.getInitialProps = async () => {
//   const res = await fetch("http://localhost:3000/api/rooms");
//   const { data } = await res.json();

//   return { rooms: data };
// };
