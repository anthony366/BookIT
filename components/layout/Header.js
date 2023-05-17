import React from "react";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              <img src="./images/bookit_logo.png" alt="BookIT" />
            </Link>
          </div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          {session ? (
            <div className="ml-4 dropdown d-line">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="user-name">{session.user.name}</span>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/bookings/me">
                  <span className="dropdown-item">My Bookings</span>
                </Link>

                <Link href="/me/update">
                  <span className="dropdown-item">Profile</span>
                </Link>

                <a
                  onClick={() => signOut()}
                  className="dropdown-item px-4 text-danger"
                >
                  Log Out
                </a>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="btn btn-danger px-4 text-white login-header-btn float-right"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
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
