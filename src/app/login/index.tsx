import Logo from '@/assets/logidriver_logo_transparent.svg';
import { useTheme } from "@/provider/Themeprovider";
import { styles } from "@/styles/loginStyles";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";

export default function LoginScreen() {
  const { colors, font } = useTheme();
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoArea}>
          <Logo width={width * 0.7} height={(width * 0.7) / 2.5} />
        </View>

        {/* Form */}
        <Text style={[styles.formTitle, { fontFamily: font.display }]}>Entrar</Text>
        <Text style={[styles.formSub, { fontFamily: font.body }]}>Acesse sua conta de motorista</Text>

        {/* Email */}
        <Text style={[styles.label, { fontFamily: font.body }]}>E-mail ou CPF</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>✉️</Text>
          <TextInput
            style={[styles.input, { fontFamily: font.body }]}
            placeholder="seuemail@empresa.com"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Senha */}
        <Text style={[styles.label, { fontFamily: font.body }]}>Senha</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={[styles.input, { fontFamily: font.body }]}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(v => !v)}>
            <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Esqueceu senha */}
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={[styles.forgotText, { fontFamily: font.body }]}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        {/* Botão login */}
        <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85}>
          <Text style={[styles.loginBtnText, { fontFamily: font.body }]}>Acessar</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={[styles.dividerText, { fontFamily: font.body }]}>ou entre com</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google */}
        <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
          <Text style={[styles.googleIcon, { fontFamily: font.body }]}>G</Text>
          <Text style={[styles.googleText, { fontFamily: font.body }]}>Continuar com Google</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}