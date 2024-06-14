import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAccessToken } from "@/utils/sessionTokenAccessor"
import ParseJwt from "@/utils/parseJwt";
import AuthCheck from "@/utils/authCheck";
import ClassName from "../components/className";
import ClassNav from "../components/classNav";

export default async function Assessments({ params }) {
  const session = await getServerSession(authOptions);
  const access_token = await getAccessToken();

  let userID
  try {
    userID = ParseJwt(access_token).sub

  } catch (error) {
    console.error('Not signed In', error);
  }

  return (
    <AuthCheck session={session} roleToCheck="teacher">
      <main className="text-center">
        <ClassName text='CLass Name' />
        <ClassNav classId={params.id} />
        Assessments
      </main>
    </AuthCheck>
  );
}
