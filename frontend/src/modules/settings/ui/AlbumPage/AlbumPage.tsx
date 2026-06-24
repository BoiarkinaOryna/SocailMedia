import { ScrollView, View, Text } from "react-native";
import { Image } from "expo-image"
import { styles } from "./album.style";
import { Link } from "@shared/ui/Links/Links";
import { SettingsCard } from "../../../../shared/ui/SettingsCard/SettingsCard";
import { Button } from "@shared/ui/Button/Button";
import { ICONS } from "@shared/icons";

import * as ImagePicker from "expo-image-picker";
import {
    useAddImageMutation,
    useGetAlbumsQuery,
} from "@modules/settings/api/api";
import { AlbumForm } from "./AlbumForm/AlbumForm";
import { useState } from "react";
import { API_BASE_URL } from "@shared/api/api";

export function AlbumPage({ token }: { token: string }) {
    console.log("TOKEN:", token);
    const { data, isLoading, refetch, error } = useGetAlbumsQuery(token);
    console.log(JSON.stringify(data, null, 2))
    const [addImage] = useAddImageMutation();
    const getImageUrl = (img: any) => {
        return `${API_BASE_URL}/uploads/${
            img.uri || img.url || img.filename || img.path || img.image
        }`
    }
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const albums = Array.isArray(data)
        ? data
        : data?.data || data?.albums || [];
    console.log("ALBUMS NORMALIZED:", albums); 
    
    const pickAndUpload = async (albumId: number) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            quality: 0.7,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        if (!asset.base64) return;

        try {
            await addImage({
                base64: asset.base64,
                albumId,
                token,
            }).unwrap();

            await refetch();
        } catch (e) {
            console.error("Upload error:", e);
        }
    };

    if (isLoading) {
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <Text>Завантаження...</Text>
            </ScrollView>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            {/* LINKS */}
            <View style={styles.linksContainer}>
                <Link
                    text="Особиста інформація"
                    link="/settings"
                    disabeled={true}
                />
                <Link text="Альбоми" linePosition={false} />
            </View>
            {/* ALBUMS */}
            {albums.length ? (
                albums.map((album: any) => (
                    <SettingsCard
                        key={album.id}
                        title={album.title}
                        button={
                            <Button
                                icon={<ICONS.SvgMound />}
                                text="Додати фото"
                                textPosition="right"
                                onPress={() => pickAndUpload(album.id)}
                            />
                        }
                    >
                        <View style={styles.albumImagesContainer}>
                            {album.profile_app_albumimage?.length ? (
                                album.profile_app_albumimage.map((img: any) => (
                                    <View
                                        key={img.id}
                                        style={styles.albumImageContainer}
                                    >
                                        <Image
                                            style={styles.albumImage}
                                            source={{
                                                uri: getImageUrl(img),
                                            }}
                                        />
                                        

                                        <View style={styles.albumImageButtons}>
                                            <Button icon={<ICONS.SvgEyeOpen />} />
                                            <Button icon={<ICONS.SvgTrashcan />} />
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <Text>Немає фотографій</Text>
                            )}
                        </View>
                    </SettingsCard>
                ))
            ) : (
                <SettingsCard
                    title="Немає ще жодного альбому"
                    button={
                        <Button
                            icon={<ICONS.SvgPlus />}
                            onPress={() => {
                                setIsOpen(true)
                            }}
                        />
                    }
                />
            )}

            <AlbumForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                refetchData={refetch}
            />
        </ScrollView>
    );
}