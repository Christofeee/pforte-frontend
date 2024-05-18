import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth"
import { getIdToken } from "@/utils/sessionTokenAccessor";
import { getRefreshToken } from "@/utils/sessionTokenAccessor";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (session) {
    const refreshToken = await getRefreshToken(); // Fetch the refresh token

    const url = `${process.env.END_SESSION_URL}`;

    const body = new URLSearchParams({
      refresh_token: refreshToken,
      client_id: process.env.CLIENT_ID, // Assuming you have CLIENT_ID in your environment variables
      client_secret: process.env.CLIENT_SECRET, // Assuming you have CLIENT_SECRET in your environment variables
    });

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!resp.ok) {
        console.error("Failed to log out on Keycloak side", await resp.text());
        return new Response(null, { status: 500 });
      }
    } catch (err) {
      console.error("Error during Keycloak logout request:", err);
      return new Response(null, { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}


// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (session) {

//     const idToken = await getIdToken();

//     // this will log out the user on Keycloak side
//     var url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`;

//     try {
//       const resp = await fetch(url, { method: "GET" });
//     } catch (err) {
//       console.error(err);
//       return new Response({ status: 500 });
//     }
//   }
//   return new Response({ status: 200 });
// }