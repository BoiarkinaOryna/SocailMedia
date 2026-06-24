import React from "react";
import { View, Text, TextInput } from "react-native";
import { InputProps } from "./input.types";
import { styles } from "./input.styles";
import { COLORS } from "@shared/constants/colors";
// import { styles } from "./input.styles";

export function Input(props: InputProps) {
  const {
    iconLeft,
    iconRight,
    label,
    labelStyle,
    error,
    style,
    multiline,
    ...rest
  } = props;

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          multiline && styles.inputWrapperMultiline,
          error && { borderColor: COLORS.red },
        ]}
      >
        {iconLeft && <View style={styles.icon}>{iconLeft}</View>}

        <TextInput
          style={[styles.input, multiline && styles.inputMultiline]}
          placeholderTextColor={COLORS.blue20}
          multiline={multiline}
          {...rest}
        />

        {iconRight && <View style={styles.icon}>{iconRight}</View>}
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
}

