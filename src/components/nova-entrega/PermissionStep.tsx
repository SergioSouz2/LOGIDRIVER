import { useTheme } from '@/provider/Themeprovider';
import { permissionStyles } from '@/styles/nova-entrega/permissionStyles';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface PermissionStepProps {
  onVoltar: () => void;
  onSolicitarPermissao: () => void;
}

export function PermissionStep({ onVoltar, onSolicitarPermissao }: PermissionStepProps) {
  const { colors } = useTheme();

  return (
    <View style={permissionStyles.permissionContainer}>
      <View style={permissionStyles.permissionIcon}>
        <Ionicons name="location-outline" size={34} color={colors.primary} />
      </View>
      <Text style={permissionStyles.permissionTitle}>Acesso à localização</Text>
      <Text style={permissionStyles.permissionSub}>
        Precisamos da sua localização para registrar o ponto GPS exato de cada empresa que você
        cadastrar.
      </Text>
      <TouchableOpacity
        onPress={onSolicitarPermissao}
        activeOpacity={0.85}
        style={permissionStyles.permissionBtn}
      >
        <Text style={permissionStyles.permissionBtnText}>Permitir localização</Text>
      </TouchableOpacity>
    </View>
  );
}