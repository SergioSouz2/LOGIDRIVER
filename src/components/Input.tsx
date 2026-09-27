import { useTheme } from "@/provider/Themeprovider";
import { styles } from "@/styles/InputStyles";
import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Input({
  label,
  icon,
  error,
  style,
  ...props
}: InputProps) {
  const { colors, font } = useTheme();

  return (
    <View>
      {label && (
        <Text
          style={[
            styles.label,
            { fontFamily: font.body }
          ]}
        >
          {label}
        </Text>
      )}

      <View style={styles.inputWrapper}>
        {icon}

        <TextInput
          style={[
            styles.input,
            { fontFamily: font.body },
            style,
          ]}
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          {...props}
        />
      </View>

      {error && (
        <Text
          style={{
            color: "red",
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}