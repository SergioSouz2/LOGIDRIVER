import type { TurnoFinalizado } from '@/components/CardTurno';
import { CardTurno } from '@/components/CardTurno';
import { Header } from '@/components/Header';
import { EmpresaGrid } from '@/components/empresas/EmpresaGrid';
import { useTheme } from '@/provider/Themeprovider';
import { formatarFrota, usePerfilStore } from '@/store/usePerfilStore';
import { useTurnosStore } from '@/store/useTurnosStore';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const adicionarTurno = useTurnosStore((s) => s.adicionarTurno);
  const perfil = usePerfilStore();

  const frotaFormatada = formatarFrota(perfil.modeloCarro, perfil.placa);

  const handleFinalizarTurno = (turno: TurnoFinalizado) => {
    adicionarTurno(turno);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 40 }}
    >
      <Header
        name={perfil.nome || 'Motorista'}
        greeting="Ola 👋"
        onNotification={() => console.log('notificações')}
        onProfile={() => router.push('/perfil')}
      />

      <CardTurno frota={frotaFormatada} onFinalizar={handleFinalizarTurno} />

      <EmpresaGrid />
    </ScrollView>
  );
}