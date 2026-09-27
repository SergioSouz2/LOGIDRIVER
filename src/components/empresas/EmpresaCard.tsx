import { useTheme } from '@/provider/Themeprovider';
import type { PontoDeEntrega } from '@/store/usePontosDeEntregaStore';
import { empresaStyles } from '@/styles/empresas/empresaStyles';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface EmpresaCardProps {
  ponto: PontoDeEntrega;
  onPress: () => void;
}

function primeiroNome(ponto: PontoDeEntrega): string {
  const nome = ponto.razaoSocialFachada || ponto.razaoSocial || ponto.cnpj;
  return nome.trim().split(/\s+/)[0];
}

export function EmpresaCard({ ponto, onPress }: EmpresaCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={empresaStyles.card}>
      <View style={empresaStyles.cardIconWrap}>
        <Ionicons name="business-outline" size={20} color={colors.primary} />
      </View>
      <Text style={empresaStyles.cardLabel} numberOfLines={1}>
        {ponto.razaoSocialFachada || ponto.razaoSocial}
      </Text>
    </TouchableOpacity>
  );
}