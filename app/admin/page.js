import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AuthCheck from "@/utils/authCheck";
import { Button } from "@mui/material";
import RouteButton from "./components/routeButton";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  return (
    <AuthCheck session={session} roleToCheck="admin">
      <main className="text-center p-5">
        <div className="p-5">
          <RouteButton path='/admin/announcements' buttonName='Announcements' />
        </div>
        <div className="my-5" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <RouteButton path='/admin/classrooms' buttonName='Classrooms' />
          <RouteButton path='/admin/accounts' buttonName='Accounts' />
        </div>
      </main>
    </AuthCheck>
  );
}