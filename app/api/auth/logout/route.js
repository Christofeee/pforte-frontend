import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth"
import { getRefreshToken } from "@/utils/sessionTokenAccessor";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (session) {
    const refreshToken = await getRefreshToken(); // Fetch the refresh token

    const url = `${process.env.END_SESSION_URL}`;

    const body = new URLSearchParams({
      refresh_token: refreshToken,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
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