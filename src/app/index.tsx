import { Redirect } from "expo-router";

export default function Index() {
  const session = true; // Simulação de sessão (substitua pela lógica real de autenticação)

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/home" />;
}