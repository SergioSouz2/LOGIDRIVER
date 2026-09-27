import { useTheme } from '@/provider/Themeprovider';
import { usePerfilStore } from '@/store/usePerfilStore';
import { perfilStyles } from '@/styles/perfil/perfilStyles';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen() {
  const { colors } = useTheme();
  const perfil = usePerfilStore();

  const temPerfilSalvo = Boolean(perfil.nome || perfil.modeloCarro || perfil.placa);

  // Começa em modo edição se ainda não tem nada salvo; senão, começa em visualização
  const [editando, setEditando] = useState(!temPerfilSalvo);

  const [nome, setNome] = useState(perfil.nome);
  const [modeloCarro, setModeloCarro] = useState(perfil.modeloCarro);
  const [placa, setPlaca] = useState(perfil.placa);

  const handleSalvar = () => {
    perfil.salvarPerfil({
      nome: nome.trim(),
      modeloCarro: modeloCarro.trim(),
      placa: placa.trim().toUpperCase(),
    });
    setEditando(false);
  };

  const handleEditar = () => {
    // Recarrega os campos com o que está salvo, garantindo que não fique
    // com valor "esquecido" de uma edição anterior cancelada
    setNome(perfil.nome);
    setModeloCarro(perfil.modeloCarro);
    setPlaca(perfil.placa);
    setEditando(true);
  };

  // ── Modo edição (formulário) ──────────────────────────────
  if (editando) {
    return (
      <ScrollView style={perfilStyles.container} contentContainerStyle={perfilStyles.content}>
        <View style={perfilStyles.avatarWrap}>
          <Ionicons name="person" size={40} color={colors.primary} />
        </View>

        <Text style={perfilStyles.title}>Meu Perfil</Text>
        <Text style={perfilStyles.sub}>
          Essas informações aparecem na Home e no Histórico de turnos
        </Text>

        <Text style={perfilStyles.label}>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome completo"
          placeholderTextColor={colors.textMuted}
          style={perfilStyles.input}
        />

        <Text style={perfilStyles.label}>Modelo do carro</Text>
        <TextInput
          value={modeloCarro}
          onChangeText={setModeloCarro}
          placeholder="Ex: Fiorino, Strada, HR..."
          placeholderTextColor={colors.textMuted}
          style={perfilStyles.input}
        />

        <Text style={perfilStyles.label}>Placa</Text>
        <TextInput
          value={placa}
          onChangeText={setPlaca}
          placeholder="Ex: ABC1D23"
          placeholderTextColor={colors.textMuted}
          style={perfilStyles.input}
          autoCapitalize="characters"
        />

        <TouchableOpacity onPress={handleSalvar} activeOpacity={0.85} style={perfilStyles.saveBtn}>
          <Ionicons name="checkmark-circle-outline" size={18} color={colors.white} />
          <Text style={perfilStyles.saveBtnText}>Salvar</Text>
        </TouchableOpacity>

        {temPerfilSalvo && (
          <TouchableOpacity
            onPress={() => setEditando(false)}
            activeOpacity={0.85}
            style={perfilStyles.cancelBtn}
          >
            <Text style={perfilStyles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  // ── Modo visualização ──────────────────────────────────────
  return (
    <ScrollView style={perfilStyles.container} contentContainerStyle={perfilStyles.content}>
      <View style={perfilStyles.avatarWrap}>
        <Ionicons name="person" size={40} color={colors.primary} />
      </View>

      <Text style={perfilStyles.title}>{perfil.nome || 'Sem nome cadastrado'}</Text>
      <Text style={perfilStyles.sub}>Motorista</Text>

      <View style={perfilStyles.infoCard}>
        <View style={perfilStyles.infoRow}>
          <View style={perfilStyles.infoIconWrap}>
            <Ionicons name="car-outline" size={20} color={colors.primary} />
          </View>
          <View style={perfilStyles.infoTextWrap}>
            <Text style={perfilStyles.infoLabel}>Modelo do carro</Text>
            <Text style={perfilStyles.infoValue}>
              {perfil.modeloCarro || 'Não informado'}
            </Text>
          </View>
        </View>

        <View style={perfilStyles.infoDivider} />

        <View style={perfilStyles.infoRow}>
          <View style={perfilStyles.infoIconWrap}>
            <Ionicons name="pricetag-outline" size={20} color={colors.primary} />
          </View>
          <View style={perfilStyles.infoTextWrap}>
            <Text style={perfilStyles.infoLabel}>Placa</Text>
            <Text style={perfilStyles.infoValue}>{perfil.placa || 'Não informado'}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleEditar} activeOpacity={0.85} style={perfilStyles.saveBtn}>
        <Ionicons name="create-outline" size={18} color={colors.white} />
        <Text style={perfilStyles.saveBtnText}>Editar informações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}