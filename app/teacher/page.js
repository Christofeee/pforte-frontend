import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getAccessToken } from "@/utils/sessionTokenAccessor"
import ParseJwt from "@/utils/parseJwt";
import AuthCheck from "@/utils/authCheck";
import Dashboard from "./components/dashBoard";

export default async function Teacher() {
    const session = await getServerSession(authOptions);
    const access_token = await getAccessToken();

    const userID = ParseJwt(access_token).sub

    return (
        <AuthCheck session={session} roleToCheck="teacher">
            <main className="text-center">
                <Dashboard userID={userID}/>
            </main>
        </AuthCheck>
    );
}