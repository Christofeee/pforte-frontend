import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAccessToken } from "@/utils/sessionTokenAccessor"
import ParseJwt from "@/utils/parseJwt";
import AuthCheck from "@/utils/authCheck";
import ClassName from "../components/className";
import ClassNav from "../components/classNav";
import Summary from "./summary";

export default async function TeacherClassroom({ params }) {
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
                <ClassName classId={params.id} />
                <ClassNav classId={params.id} />
                <div className="p-5">
                    <Summary />
                </div>
            </main>
        </AuthCheck>
    );
}

// export default function TeacherClassroom({params}) {

//     return (
//         <main className="text-center">
//             {/* <Dashboard userID={userID}/> */}In classroom {params.id}
//         </main>
//     );
// }


// import { useRouter } from 'next/router';

// function ProductDetails() {
//   const router = useRouter();
//   const { productId } = router.query; // Destructure the variable from `query`

//   return (
//     <div>
//       <h1>Product ID: {productId}</h1>
//       {/* Display product details based on productId */}
//     </div>
//   );
// }

// export default ProductDetails;