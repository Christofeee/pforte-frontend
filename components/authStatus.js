"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { getIdToken } from "@/utils/sessionTokenAccessor";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "POST" });
  } catch (err) {
    console.error(err);
  }
}

// async function keycloakSessionLogOut() {
//   try {
//     const idToken = await getIdToken();
//     const url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`;
//     const resp = await fetch(url, { method: "GET" });
//     if (resp.ok) {
//       return new Response({ status: 200 });
//     } else {
//       throw new Error("Failed to logout from Keycloak.");
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

export default function AuthStatus() {
  const { data: session, status } = useSession();

  useEffect(() => {

    if (
      status != "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);


  if (status == "loading") {
    return <div className="my-3">Loading...</div>;
  } else if (session) {
    return (
      <div className="my-3">
        Logged in as <span className="text-yellow-100">{session.user.email}</span>{" "}
        <button
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
          }}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="my-3">
      Not logged in.{" "}
      <button
        className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
        onClick={() => signIn("keycloak")}>
        Log in
      </button>
    </div>
  );
}