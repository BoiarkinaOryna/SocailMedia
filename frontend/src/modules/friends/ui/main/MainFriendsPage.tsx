import { View } from 'react-native';
import { styles } from './main.styles';
import { Link } from '@shared/ui/Links/Links';
import { OverviewPage } from './mainOverview/MainOverviewPage';

export function MainFriendsPage(){
    return <View style={styles.mainContainer}>
        <View style={styles.linksContainer}>
            <Link
                text = "Головна"
                linePosition={false}
                ></Link>
            <Link
                text = "Запити"
                link='/friends/requests'
                disabeled={true}   
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
        <OverviewPage activeTab='main'/>
    </View>
}