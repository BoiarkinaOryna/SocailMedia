import { Modal, View, Text } from "react-native";
import { styles } from "./album-form.styles";
import { ICONS } from "@shared/icons";
import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";
import { Controller, useForm } from 'react-hook-form'
import { AlbumSchema } from "@modules/settings/types/my-data.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { albumValidator } from "@modules/settings/models/my-data.validation";
import { useCreateAlbumMutation } from "@modules/settings/api/api";
import { useUserContext } from "@modules/auth/context/user.context";
import { router } from "expo-router";

export function AlbumForm({isOpen, setIsOpen, refetchData}: {isOpen: boolean, setIsOpen: any, refetchData: () => any}){
    const { handleSubmit, control } = useForm<AlbumSchema>({
        resolver: yupResolver(albumValidator),
        mode: "onChange",
    });

    const { token } = useUserContext()
    const [ createAlbumMutation, { error, isLoading } ] = useCreateAlbumMutation()

    async function createAlbum(data: AlbumSchema) {
        try{
            if(token){
                await createAlbumMutation({body: data, token}).unwrap()
                setIsOpen(false)
                refetchData()
            } else{
                router.push("/auth")
            }
        }catch(e){
            console.error(e)
        } 
    } 


    return <Modal
            visible={isOpen}
            transparent
        >
        <View style={styles.background}>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <ICONS.SvgCross/>
                </View>
                <Text style={styles.headline}>Створити альбом</Text>
                <View style={styles.inputsContainer}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => {
                            return <Input
                                label="Назва альбому"
                                placeholder="Настрій"
                                onChangeText={field.onChange}
                                value={field.value}
                                error={fieldState.error?.message}
                            />  
                        }}
                    
                    />
                    <Controller
                        name="theme"
                        control={control}
                        render={({field, fieldState}) => {
                            return <Input
                                label="Оберіть тему"
                                placeholder="Природа"
                                iconRight={<ICONS.SvgOpenMenu/>}
                                onChangeText={field.onChange}
                                value={field.value}
                                error={fieldState.error?.message}
                            />
                        }}
                    />
                    <Controller
                        name="year"
                        control={control}
                        render={({ field, fieldState }) =>{
                            return <Input
                                label="Рік альбому"
                                placeholder="Оберіть рік"
                                iconRight={<ICONS.SvgOpenMenu/>}
                                value={String(field.value)}
                                onChangeText={field.onChange}
                                error={fieldState.error?.message}
                            />
                        }}
                    />
                </View>
                <View style={styles.container}>
                    
                    <Button 
                        text="Скасувати" 
                        textPosition="left"
                    />
                    <Button
                        isDark={true}
                        text="Зберегти"
                        textPosition="left"
                        onPress={handleSubmit(createAlbum)}/>
                </View>
            </View>
        </View>
    </Modal>
}