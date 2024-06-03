import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AuthCheck from "@/utils/authCheck";

export default async function Announcements() {
  const session = await getServerSession(authOptions);

  return (
    <AuthCheck session={session} roleToCheck="admin">
      <h1>Manage announcements here</h1>
    </AuthCheck>
  );
}