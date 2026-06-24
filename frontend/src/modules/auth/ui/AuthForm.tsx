import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuthForm } from "../hooks/useAuthForm";
import { styles } from "./auth.styles";
import { Input } from "@shared/ui/Input/Input";
import { useEffect } from "react";

type Props = {
  mode: "login" | "register";
  onChangeMode?: (mode: "login" | "register") => void;
};

export default function AuthForm({ mode, onChangeMode }: Props) {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    isLoading,
    isRegister,
    isComplete
  } = useAuthForm(mode);

  useEffect(() => {
    if (isComplete) {
      onChangeMode?.("login");
    }
  }, [isComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => onChangeMode?.("register")}>
            <Text style={[styles.tab, isRegister && styles.activeTab]}>
              Реєстрація
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onChangeMode?.("login")}>
            <Text style={[styles.tab, !isRegister && styles.activeTab]}>
              Авторизація
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          {isRegister ? "Приєднуйся до World IT" : "Раді тебе знову бачити!"}
        </Text>

        {/* EMAIL */}
        <View style={styles.inputsBlock}>
          <Input
            label="Електронна пошта"
            placeholder="you@example.com"
            autoCorrect={false}
            autoCapitalize="none"
            // style={styles.input}
            value={form.email}
            onChangeText={(t) => handleChange("email", t)}
            error={errors.email}
          />

          {/* PASSWORD */}
          <Input
            label="Пароль"
            placeholder="Введи пароль"
            secureTextEntry
            // style={styles.input}
            value={form.password}
            onChangeText={(t) => handleChange("password", t)}
            error={errors.password}
          />

          {/* CONFIRM PASSWORD */}
          {isRegister && (
            <View>
              <Input
                label="Підтверди пароль"
                placeholder="Повтори пароль"
                secureTextEntry
                // style={styles.input}
                value={form.confirmPassword}
                onChangeText={(t) =>
                  handleChange("confirmPassword", t)
                }
                error={errors.confirmPassword}
              />
            </View>
          )}
        </View>
        {/* SUBMIT */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading
              ? "Завантаження..."
              : isRegister
              ? "Створити акаунт"
              : "Увійти"}
          </Text>
        </TouchableOpacity>

        {/* GENERAL ERROR */}
        {errors.general && (
          <Text style={styles.error}>{errors.general}</Text>
        )}
      </View>
    </View>
  );
}