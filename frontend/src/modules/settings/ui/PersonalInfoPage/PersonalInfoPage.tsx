import { ScrollView, Text, View } from 'react-native';
import { styles } from './personal-info.styles';
import { SettingsCard } from '../../../../shared/ui/SettingsCard/SettingsCard';
import { Image } from 'expo-image';
import { Link } from '@shared/ui/Links/Links';
import { Input } from '@shared/ui/Input/Input';
import { Button } from '@shared/ui/Button/Button';
import { ICONS } from '@shared/icons';
import { Controller, useForm } from 'react-hook-form';
import { MyDataSchema } from '../../types/my-data.types';
import { myDataValidator } from '../../models/my-data.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateProfileMutation } from '@modules/settings/api/api';
import { useUserContext } from '@modules/auth/context/user.context';
import { useLazyMeQuery } from '@modules/auth/api/auth.api';
import { useEffect } from 'react';
import { API_BASE_URL } from '@shared/api/api';


export function PersonalInfoPage(){
    const { handleSubmit, control } = useForm<MyDataSchema>({
        resolver: yupResolver(myDataValidator),
        mode: "onChange",
    });

    // const 
    const [ update, {error, isLoading} ] = useUpdateProfileMutation()
    const [getUserData] = useLazyMeQuery();

    const { token, user, setUser } = useUserContext()
    
    const getImageUrl = (img: string) => {
        const uri = `${API_BASE_URL}/uploads/${img}`
        return uri
    }
    useEffect(() => {
        async function updateUser() {
            console.log("updating user ...")
            const newUser = await getUserData(token!).unwrap()
            setUser(newUser)
        }
        updateUser()
    }, [])
    
    console.log("user in personal info", user, user?.avatar)
    async function sendForm(data: MyDataSchema){
        console.log("button pressed")
        try{
            token && await update({body: data, token})
            refetchUser(true);
        } catch(error){
            console.log("error:", error)
        }
    }

    return <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.linksContainer}> 
            <Link 
                text = "Особиста інформація"
                linePosition={false}
            ></Link>
            <Link 
                text = "Альбоми"
                link = "/settings/album"                
                disabeled={true}
            ></Link>
        </View>
        <SettingsCard title='Картка профілю' button={<Button icon={<ICONS.SvgPen/>}/>}>
            <View style={styles.profileCard}>
                <Image style={styles.avatar} source={{ uri: user?.avatar && getImageUrl(user?.avatar)}} />
                <View style={styles.nameContainer}>
                    <Text style={styles.currentName}>{user?.pseudonym}</Text>
                    <Text>{user?.username}</Text>
                </View>
            </View>
        </SettingsCard>

        <SettingsCard title='Особиста інформація' button={<Button onPress={() => sendForm} icon={<ICONS.SvgPen/>}/>}>
            <View style={styles.inputContainer}>
                <Controller
                    name="name"
                    control={control}
                    render={({field, fieldState}) => {
                        return <Input
                            label = "Ім'я"
                            placeholder = "Введіть ім'я"
                        />
                    }}
                />
                <Controller
                    name="surname"
                    control={control}
                    render={({field, fieldState}) => {
                        return <Input
                            label = "Прізвище"
                            placeholder = "Введіть прізвище"
                        />
                    }}
                />
                <Controller
                    name="birthDate"
                    control={control}
                    render={({field, fieldState}) => {
                        return <Input
                            label = "Дата народження"
                            placeholder = {user?.birth_date}
                        />
                    }}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({field, fieldState}) => {
                        return <Input
                            label = "Електорна адреса"
                            placeholder = {user?.email}
                            inputMode="email"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            // inputContainerStyle={styles.inputContainer}
                            // style={styles.input}
                            onChangeText={field.onChange}
                            value={field.value}
                            error={fieldState.error?.message}
                        />
                    }}
                />

            </View>
            <View style={styles.passwordContainer}> 
                <Text style = {styles.passwordText} >Пароль</Text>
                <Button icon={<ICONS.SvgPen/>}/>
            </View>
            <Input
                label = "Пароль"
                placeholder = "*******"
                iconRight = {<ICONS.SvgEyeClosed />}
            />
        </SettingsCard>

        <SettingsCard title="Варіанти підпису" button={<Button icon={<ICONS.SvgPen/>}/>}>
            <View style={styles.checkListItem}>
                <ICONS.SvgTick/>
                <Text style={styles.signatureText}>Псевдонім автора</Text>
            </View>
            <Text style={styles.pseudonym}>Lina Li</Text>
            <View style={styles.checkListItem}>
                <ICONS.SvgTick/>
                <Text style={styles.signatureText}>Мій електронний підпис</Text>
            </View>
            <View style={styles.signatureContainer}>

                <Image
                    source={require("@assets/signature3.png")}
                    contentFit="contain"
                    style={styles.signature}
                />
            </View>
        </SettingsCard>

    </ScrollView>
}