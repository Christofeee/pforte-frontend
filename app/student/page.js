// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../api/auth/[...nextauth]/route";
// // import AuthCheck from "@/utils/authCheck";

// // export default async function Student() {
// //     const session = await getServerSession(authOptions);

// //     return (
// //         <AuthCheck session={session} roleToCheck="student">
// //             <main className="text-center">
// //                 <h1 className="text-4xl">Student</h1>
// //             </main>
// //         </AuthCheck>
// //     );
// // }

// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { getAccessToken } from "@/utils/sessionTokenAccessor"
// import ParseJwt from "@/utils/parseJwt";
// import AuthCheck from "@/utils/authCheck";
// import Dashboard from "./components/dashBoard";

// export default async function Teacher() {
//     const session = await getServerSession(authOptions);
//     const access_token = await getAccessToken();
//     let userID
//     try {
//         userID = ParseJwt(access_token).sub

//     } catch (error) {
//         console.error('Not signed In', error);
//     }
    

//     return (
//         <AuthCheck session={session} roleToCheck="student">
//             <main className="text-center">
//                 <Dashboard userID={userID}/>
//             </main>
//         </AuthCheck>
//     );
// }