import Logo from "@/assets/logo.png";
import { Input } from "@/components/Input";
import { useTheme } from "@/provider/Themeprovider";
import { styles } from "@/styles/loginStyles";
import { Ionicons } from "@expo/vector-icons";


import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const { colors, font } = useTheme();

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
          <Image source={Logo} style={styles.logo} />
        </View>

        {/* Form */}
        <Text style={[styles.formTitle, { fontFamily: font.display }]}>Entrar</Text>
        <Text style={[styles.formSub, { fontFamily: font.body }]}>Acesse sua conta de motorista</Text>

        <Input
          label="Email"
          placeholder="Digite seu email"
          icon={
            <Ionicons
              name="mail-outline"
              size={20}
              color="#666"
            />
          }
          value={email}
          onChangeText={setEmail}
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
            />
          }
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

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