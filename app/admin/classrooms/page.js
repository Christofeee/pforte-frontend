import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AuthCheck from "@/utils/authCheck";
import ManageClassrooms from "./components/manageClassrooms";

export default async function Classrooms() {
  const session = await getServerSession(authOptions);

  return (
    <AuthCheck session={session} roleToCheck="admin">
      <ManageClassrooms />
    </AuthCheck>
  );
}