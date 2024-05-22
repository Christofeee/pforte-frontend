import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Index from "@/components";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <Index session={session} />
}