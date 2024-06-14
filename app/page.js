import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Init from "@/views/init";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <Init session={session} />
}