import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AuthCheck from "@/utils/authCheck";
import Management from "./components/management";

export default async function Accounts() {
  const session = await getServerSession(authOptions);

  return (
    <AuthCheck session={session} roleToCheck="admin">
      <Management />
    </AuthCheck>
  );
}