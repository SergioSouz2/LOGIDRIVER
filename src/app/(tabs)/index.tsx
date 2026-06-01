import { CardTurno } from '@/components/CardTurno';
import { Header } from '@/components/Header';
import { useTheme } from '@/provider/Themeprovider';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 40 }}
    >
      <Header
        name="Carlos Silva"
        greeting="Ola 👋"
        onNotification={() => console.log('notificações')}
        onProfile={() => router.push('/perfil')}
      />

      <CardTurno
        frota="ABC-1234"
        onFinalizar={(totalSeconds) => console.log('Turno finalizado:', totalSeconds)}
      />
    </ScrollView>
  );
}