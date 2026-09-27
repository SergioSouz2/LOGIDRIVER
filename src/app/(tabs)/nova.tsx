import { PermissionStep } from '@/components/nova-entrega/PermissionStep';
import { useCadastroEmpresa } from '@/components/nova-entrega/useCadastroEmpresa';
import { useTheme } from '@/provider/Themeprovider';
import { cadastroStyles } from '@/styles/nova-entrega/cadastroStyles';
import { shared } from '@/styles/nova-entrega/shared';
import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function NovaScreen() {
  const { colors } = useTheme();
  const cadastro = useCadastroEmpresa();

  if (cadastro.locationPermission === null) {
    return <View style={shared.container} />;
  }

  if (!cadastro.locationPermission) {
    return (
      <PermissionStep
        onVoltar={() => {}}
        onSolicitarPermissao={cadastro.solicitarPermissao}
      />
    );
  }

  return (
    <ScrollView style={shared.container} contentContainerStyle={cadastroStyles.content}>
      <Text style={cadastroStyles.title}>Nova Empresa</Text>
      <Text style={cadastroStyles.sub}>
        Cadastre um ponto de entrega na sua biblioteca de endereços
      </Text>

      <Text style={cadastroStyles.label}>CNPJ</Text>
      <TextInput
        value={cadastro.cnpj}
        onChangeText={cadastro.setCnpj}
        placeholder="00.000.000/0000-00"
        placeholderTextColor={colors.textMuted}
        style={cadastroStyles.input}
        keyboardType="numbers-and-punctuation"
      />

      <TouchableOpacity
        onPress={cadastro.buscarDadosOficiais}
        activeOpacity={0.85}
        style={[shared.retakeBtn, { marginTop: 12 }]}
        disabled={cadastro.buscandoCnpj}
      >
        {cadastro.buscandoCnpj ? (
          <ActivityIndicator size="small" color={colors.text} />
        ) : (
          <>
            <Ionicons name="search-outline" size={18} color={colors.text} />
            <Text style={shared.retakeBtnText}>Buscar dados oficiais (CNPJ.biz)</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={cadastroStyles.label}>Razão Social (nota fiscal)</Text>
      <TextInput
        value={cadastro.razaoSocial}
        onChangeText={cadastro.setRazaoSocial}
        placeholder="Preenchido automaticamente ao buscar"
        placeholderTextColor={colors.textMuted}
        style={cadastroStyles.input}
      />

      <Text style={cadastroStyles.label}>Razão Social (fachada)</Text>
      <TextInput
        value={cadastro.razaoSocialFachada}
        onChangeText={cadastro.setRazaoSocialFachada}
        placeholder="Nome como está escrito na fachada"
        placeholderTextColor={colors.textMuted}
        style={cadastroStyles.input}
      />

      <Text style={cadastroStyles.label}>Telefone</Text>
      <TextInput
        value={cadastro.telefone}
        onChangeText={cadastro.setTelefone}
        placeholder="Não identificado"
        placeholderTextColor={colors.textMuted}
        style={cadastroStyles.input}
        keyboardType="phone-pad"
      />

      <Text style={cadastroStyles.label}>Endereço de correspondência</Text>
      <TextInput
        value={cadastro.endereco}
        onChangeText={cadastro.setEndereco}
        placeholder="Preenchido automaticamente ao buscar, ou digite manualmente"
        placeholderTextColor={colors.textMuted}
        style={cadastroStyles.input}
        multiline
      />

      <TouchableOpacity
        onPress={cadastro.capturarLocalizacao}
        activeOpacity={0.85}
        style={cadastroStyles.gpsCard}
        disabled={cadastro.capturandoLocalizacao}
      >
        <Ionicons name="location-outline" size={22} color={colors.primary} />
        <View style={{ flex: 1 }}>
          <Text style={cadastroStyles.gpsCardText}>
            {cadastro.coordenadas ? 'Localização capturada' : 'Toque para capturar sua posição atual (GPS)'}
          </Text>
          {cadastro.coordenadas && (
            <Text style={cadastroStyles.gpsCardValue}>
              {cadastro.coordenadas.latitude.toFixed(6)}, {cadastro.coordenadas.longitude.toFixed(6)}
            </Text>
          )}
        </View>
        {cadastro.capturandoLocalizacao && <ActivityIndicator size="small" color={colors.primary} />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={cadastro.salvarEmpresa}
        activeOpacity={0.85}
        style={[shared.useBtn, { marginTop: 24 }]}
        disabled={cadastro.salvando}
      >
        {cadastro.salvando ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <>
            <Ionicons name="checkmark-circle-outline" size={18} color={colors.white} />
            <Text style={shared.useBtnText}>Salvar ponto de entrega</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}