import { useUserContext } from '@modules/auth/context/user.context';
import { FirstVisitModal } from '@modules/auth/ui/FirstVisitModal/FirstVisistModal';
import { AllPublications } from '@modules/publication/ui/AllPublications/AllPublications';
import { View } from 'react-native';


export default function Home(){
    const { user } = useUserContext()

    return <View>
        { !user?.username && <FirstVisitModal/> }
        <AllPublications />
    </View>
}