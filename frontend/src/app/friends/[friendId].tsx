import { FriendProfileScreen } from "@modules/friends/ui/FriendProfileScreen";
import { useRoute } from "@react-navigation/core";
import { useLocalSearchParams } from "expo-router";
import { usePathname, useGlobalSearchParams } from 'expo-router';


export default function FriendsProfile(){
    const localParams = useLocalSearchParams<{friendId: string}>()
    // const route = useRoute();
    // const params = new  URLSearchParams(route.name)
    const params = useGlobalSearchParams();
    let type = params.type
    typeof(type) !== "string" && (type = type[0])
    console.log("friend id", localParams.friendId, type)

    return <FriendProfileScreen id={+localParams.friendId} type={type}/>
}