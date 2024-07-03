import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AuthCheck from "@/utils/authCheck";
import ComingSoon from "@/components/ComingSoon";

export default async function Announcements() {
  const session = await getServerSession(authOptions);

  return (
    <AuthCheck session={session} roleToCheck="admin">
      <ComingSoon />
    </AuthCheck>
  );
}