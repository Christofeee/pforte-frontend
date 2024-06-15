import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAccessToken } from "@/utils/sessionTokenAccessor"
import ParseJwt from "@/utils/parseJwt";
import AuthCheck from "@/utils/authCheck";
import ClassName from "../components/className";
import ClassNav from "../components/classNav";
import Modulelist from "./components/moduleList";

export default async function Modules({ params }) {
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
      <main className="p-5">
        <ClassName text='Class Name' />
        <ClassNav classId={params.id} />
        <div className="p-5">
          <Modulelist classId={params.id}/>
        </div>
      </main>
    </AuthCheck>
  );
}


// import React from 'react';
// import ClassNav from "../components/classNav";
// import Typography from '@mui/material/Typography';

// export default function Modules({ userID }) {
//   return (
//     <main className="p-5">
//       <Typography variant="h6" className="text-black-50 text-center">
//         Class Name
//       </Typography>
//       <ClassNav />
//       Modules
//     </main>
//     // <Container className='py-5'>
//     //   {/* <Container style={{ padding: '10px', backgroundColor: 'lightgrey' }}>
//     //     <Typography variant="h6">Admin Announcements</Typography>
//     //     <Typography variant="body2">Coming Soon</Typography>
//     //   </Container> */}
//     //   <Grid container spacing={2} className='p-5'>
//     //     <Grid item md={6} sm={6} xs={12}>
//     //       <div >
//     //         {/* <Classes userID={userID} /> */}Module
//     //       </div>
//     //     </Grid>
//     //     <Grid item md={6} sm={6} xs={12}>
//     //       <div>
//     //         {/* <AssessmentStatus /> */}Status
//     //       </div>
//     //     </Grid>
//     //   </Grid>
//     // </Container>
//   );
// }
