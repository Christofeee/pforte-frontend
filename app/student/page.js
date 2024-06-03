import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AuthCheck from "@/utils/authCheck";

export default async function Student() {
    const session = await getServerSession(authOptions);

    return (
        <AuthCheck session={session} roleToCheck="student">
            <main className="text-center">
                <h1 className="text-4xl">Student</h1>
            </main>
        </AuthCheck>
    );
}