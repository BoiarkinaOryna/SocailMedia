import { View } from 'react-native';
import { styles } from './requests.styles';
import { Link } from '@shared/ui/Links/Links';
import { OverviewPage } from '../main/mainOverview/MainOverviewPage';

export function FriendsRequestsPage(){
    return <View style={styles.mainContainer}>
        <View style={styles.linksContainer}>
            <Link
                text = "Головна"
                link='/friends/friends'
                disabeled={true}
            ></Link>
            <Link
                text = "Запити"
                linePosition={false}
                ></Link><Link
                text = "Рекомендації"
                link='/friends/recommendations'
                disabeled={true}   
            ></Link>
            <Link 
                text = "Всі друзі"
                link='/friends'
                disabeled={true}
            ></Link>
        </View>
        <OverviewPage activeTab='requests' />
    </View>
}