import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl, Pressable } from 'react-native';
import { Card } from '../../Card/Card';
import { COLORS } from '@shared/constants/colors';
import { SettingsCard } from '@shared/ui/SettingsCard/SettingsCard';
import { useGetFriendsQuery, useGetRecommendationsQuery, useGetRequestsQuery } from '@modules/friends/api/friends.api';
import { useUserContext } from '@modules/auth/context/user.context';
import { router } from 'expo-router';
import { useRoute } from '@react-navigation/native';

interface OverviewProps {
    activeTab: 'main' | 'requests' | 'recommendations' | 'friends'
}

export function OverviewPage(props: OverviewProps) {
    const { activeTab } = props
    const { token } = useUserContext()
    const [loading, setLoading] = useState<boolean>(false)

    const {
        data: friendsData,
        error: friendsError,
        isLoading: friendsIsLoading,
        refetch: friendsRefetch
    } = useGetFriendsQuery(token!)

    const {
        data: recommendationsData,
        error: recommendationsError,
        isLoading: recommendationsIsLoading,
        refetch: recommendationsRefetch
    } = useGetRecommendationsQuery(token!)

    const {
        data: requestsData,
        error: requestsError,
        isLoading: requestsIsLoading,
        refetch: requestsRefetch
    } = useGetRequestsQuery(token!)

    const onRefresh = useCallback(async () => {
        setLoading(true);
        await friendsRefetch();
        await recommendationsRefetch()
        await requestsRefetch()
        setLoading(false);
        console.log("my posts is refreshed")
    }, [friendsRefetch, recommendationsRefetch, requestsRefetch]);

    console.log("friends data", friendsData)
    const route = useRoute();
    const routeName = route.name;
    return <View>
        <ScrollView
            contentContainerStyle={overviewStyles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh}/>
                }
        >
            { (activeTab === "main" || activeTab === "requests") && (
                <SettingsCard title='Запити' button={routeName !== "friends/requests" && <Pressable onPress={() => {router.push("/friends/requests")}}><Text>Дивитись всі</Text></Pressable>}>
                    {!requestsData || requestsData.length === 0 ? (
                        <Text>Запити відсутні</Text>
                    ) : (requestsData.map((request) => (
                        <Card
                            key={request.from_user_id}
                            id={request.from_user_id}
                            type="request"
                            name={request.pseudonym}
                            username={request.pseudonym}
                        />
                    )))}
                </SettingsCard>
            )}
            { (activeTab === "main" || activeTab === "recommendations") && (
                <SettingsCard title='Рекомендації' button={routeName !== "friends/recommendations" && <Pressable onPress={() => {router.push("/friends/recommendations")}}><Text>Дивитись всі</Text></Pressable>}>
                    {!recommendationsData || recommendationsData.length === 0 ? (
                        <Text>Рекомендації відсутні</Text>
                    ) : (recommendationsData.map((recommendation) => (
                        <Card
                            key={recommendation.id}
                            id={recommendation.id}
                            type="recommendation"
                            name={recommendation.pseudonym}
                            username={recommendation.username}
                        />
                    )))}
                </SettingsCard>
            )}
            { (activeTab === "main" || activeTab === "friends") && (
                <SettingsCard title='Всі друзі' button={routeName !== "friends/index" && <Pressable onPress={() => {router.push("/friends")}}><Text>Дивитись всі</Text></Pressable>}>
                    {!friendsData || friendsData.length === 0 ? (
                        <Text>Друзі відсутні</Text>
                    ) : (friendsData.map((friend) => (
                        <Card
                            key={friend.id}
                            id={friend.id}
                            type="friend"
                            name={friend.pseudonym}
                            username={friend.username}
                        />
                    )))}
                </SettingsCard>
            )}
            
            <View style={overviewStyles.bottomSpacing} />
        </ScrollView>
    </View>
}


const overviewStyles = StyleSheet.create({
    container: {
        gap: 8,
        paddingBottom: 300
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 12,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black,
    },
    seeAllText: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.blue50,
    },
    bottomSpacing: {
        height: 30,
    }
});
