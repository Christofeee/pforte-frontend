import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Welcome from "@/pages/welcome";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <Welcome session={session} />
}