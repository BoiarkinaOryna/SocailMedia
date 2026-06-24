// import { router } from "expo-router";
// import { useEffect } from "react";
// import { useMeQuery } from "../api/auth.api";
// import { useUserContext } from "../context/user.context";

// export function useGetUserData(){
//     const { token, setUser } = useUserContext()

//     const { data, isLoading, error } = useMeQuery(token!, {
//         skip: !token
//     })

//     useEffect(() => {
//         if (!token) {
//             router.canGoBack() ? router.back() : router.push("/auth")
//         }
//     }, [token])

//     useEffect(() => {
//         if (data) {
//             console.log("data is set in user context", data)
//             setUser(data)
//         }
//     }, [data])

//     return {
//         userData: data,
//         isUserLoading: isLoading,
//         userError: error
//     }
// }