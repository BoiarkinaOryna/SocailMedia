import { useUserContext } from "@modules/auth/context/user.context";
import { AlbumPage } from "../../modules/settings/ui/AlbumPage/AlbumPage";

export default function Albums(){
    const { token } = useUserContext()
    return <AlbumPage token={token!} />
}