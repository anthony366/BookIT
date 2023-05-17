import Head from "next/head";
import Search from "@/components/Search";
import { useRouter } from "next/router";

export default function searchIndex() {
  const router = useRouter();
  let { location, guests, category } = router.query;
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
