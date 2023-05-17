import React from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";

export default function profile() {
  return (
    <section>
      <h3>Profile Page</h3>
      <Link href={"/"}>Home Page</Link>
    </section>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
