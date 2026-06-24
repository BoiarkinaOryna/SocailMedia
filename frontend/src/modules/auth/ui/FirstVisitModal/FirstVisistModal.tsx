import { View,Text, Modal } from "react-native";
import { styles } from "./first-visit-modal.styles";
import { Input } from "@shared/ui/Input/Input"; 
import { Controller, useForm } from "react-hook-form";
import { firstVisitSchema } from "@modules/auth/types/first-visit.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { firstVisitValidator } from "@modules/auth/models/first-visit.validation";
import { Button } from "@shared/ui/Button/Button";
import { useFirstVisitMutation, useLazyMeQuery } from "@modules/auth/api/auth.api";
import { useUserContext } from "@modules/auth/context/user.context";
import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";



export function FirstVisitModal() {
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    
    const { token, user, setUser } = useUserContext()
    const [ getUserData ] = useLazyMeQuery()
    
    const { handleSubmit, control } = useForm<firstVisitSchema>({
      resolver: yupResolver(firstVisitValidator),
      mode: "onChange"
    })

    const [ firstVisit, {isLoading, error} ] = useFirstVisitMutation()

    async function reloadUser() {
      console.log("new user is being got with token", token)
      if (!token) return

      const newUser = await getUserData(token).unwrap()
      // await AsyncStorage.setItem("username", newUser.username!)
      // newUser.pseudonym && await AsyncStorage.setItem("pseudonym", newUser.pseudonym)
      setUser(newUser)
    }

    async function submit(data: firstVisitSchema){
      console.log("first visit modal button is pressed")
      try{
        if (token){
          await firstVisit({body: data, token}).unwrap()
          reloadUser()
          setIsOpen(false)
        } else {
          console.log("token is missing")
        }
      } catch (error){
        console.log("first visit modal error:", error)
      }
    } 

    useEffect(() => {
      if (!user?.username) {
          setIsOpen(true)
        }
    }, [user])

    
    return (
      <Modal
        visible={isOpen}
        transparent
      >
        <View style={styles.background}>
            <View style={styles.mainContainer}>
              <View style = {styles.title}>
                <Text style={styles.detailsHeadline}>
                  Додайте деталі про себе
                </Text>
              </View>
              <View style = {styles.details}>
                <Controller
                  name="pseudonym"
                  control={control}
                  render={({field, fieldState}) => {
                    return <Input
                    label="Псевдонім автора"
                    placeholder="Введіть псевдонім автора"
                    autoCorrect={false}
                    onChangeText={field.onChange}
                    value={field.value}
                    labelStyle = {styles.textGray}
                    error={fieldState.error?.message}
                    />
                  }}
                />
                <Controller
                  name="username"
                  control={control}
                  render={({field, fieldState}) => {
                    return <Input
                    label="Ім'я користвуча"
                    placeholder="@"
                      autoCorrect={false}
                      onChangeText={field.onChange}
								      value={field.value}
                      labelStyle = {styles.textGray}
                      error={fieldState.error?.message}
                      />
                    }}
                    />
                <Text style={ styles.hint }>Або оберіть: <Text style={ styles.greenText }>(Запропоновані варіанти відповідно до Ім’я та Прізвища)</Text></Text>

              </View>
              <View style = {styles.buttonContainer}>
                <Button
                  onPress={handleSubmit(submit)}
                  isDark={true}
                  text={ !isLoading ? "Продовжити" : "Завантаження"}
                  textPosition="right"
                  />
                { error && <Text>Сталася помилка: { "status" in error ? error.status : error.message } </Text> }
              </View>
            </View>
        </View>
      </Modal>
    )
}
