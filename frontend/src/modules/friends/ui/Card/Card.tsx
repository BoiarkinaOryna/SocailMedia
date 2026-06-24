import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './card.styles';
import React from 'react';
import { router } from 'expo-router';
import { useCreateChatMutation, useLazyGetChatIdByUserIdsQuery } from '@modules/chats/api/chat.api';
import { useUserContext } from '@modules/auth/context/user.context';

interface CardProps {
    id: number
    type: 'request' | 'recommendation' | 'friend';
    name: string | null;
    username: string | null;
    avatarUrl?: string | null;
    // onPrimaryPress?: () => void;
    // onSecondaryPress?: () => void;
}

export function Card({ 
    id,
    type, 
    name, 
    username, 
    avatarUrl, 
    // onPrimaryPress, 
    // onSecondaryPress 
}: CardProps) {
    const getPrimaryText = () => {
        if (type === 'request') return 'Підтвердити';
        if (type === 'recommendation') return 'Додати';
        return 'Повідомлення';
    };
    const {token} = useUserContext()
    if (!token){
        router.push("/auth")
        return
    }
    const [getChatId, { error: ChatIdError, isError: isChatIdError, isLoading: isChatIdLoading}] = useLazyGetChatIdByUserIdsQuery()
    const [ createChat, {data, isLoading, error} ] = useCreateChatMutation()

    async function openChat(){
        // console.log("user id", id)
        const chatIdObj = await getChatId({userId: id, token: token!})
        // console.log("chat id", chatIdObj, chatIdObj?.data?.chatId)
        console.log(1)
        console.log("chat1", data)
        if (chatIdObj.data?.chatId && !isNaN(chatIdObj.data?.chatId)){
            router.push(`/chats/${chatIdObj.data?.chatId}`)
            return
        } else{
            console.log(2)
            // if ("status" in ChatIdError && ChatIdError.status == 404){
            console.log("id", id)
                await createChat({contactData: {contactUserId: [id]}, token: token!})
                console.log("chat2", data)
                if (!error){
                    console.log(3)
                    router.push(`/chats/${data.id}`)
                    return
                }
            // }
            console.log("ChatIdError", ChatIdError)
        }
    }

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: avatarUrl || 'pravatar.cc' }}
                style={styles.avatar}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.username}>{username}</Text>

            <View style={styles.buttons}>
                <TouchableOpacity 
                    style={styles.primaryBtn} 
                    onPress={() => {
                        if (type === "request"){
                            router.push(`/friends/${id}?type=${"acceptRequest"}`)
                        } else if (type === "recommendation"){
                            router.push(`/friends/${id}?type=${"sendRequest"}`)
                        }
                        else {
                            openChat()
                        }
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={styles.primaryText}>{getPrimaryText()}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.secondaryBtn} 
                    onPress={() => {
                        if (type === "request"){
                            router.push(`/friends/${id}?type=${"acceptRequest"}`)
                        } else if (type === "recommendation"){
                            router.push(`/friends/${id}?type=${"sendRequest"}`)
                        }
                        else {
                            router.push(`/friends/${id}?type=${"deleteFriend"}`)
                        }
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.secondaryText}>Видалити</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
