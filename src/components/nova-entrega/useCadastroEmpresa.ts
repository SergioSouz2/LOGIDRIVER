import { consultarCnpj } from '@/services/cnpj';
import {
  capturarLocalizacaoAtual,
  solicitarPermissaoLocalizacao,
  verificarPermissaoLocalizacao,
  type Coordenadas,
} from '@/services/location';
import { usePontosDeEntregaStore } from '@/store/usePontosDeEntregaStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useCadastroEmpresa() {
  const router = useRouter();
  const params = useLocalSearchParams<{ cnpjEditar?: string }>();
  const salvarPonto = usePontosDeEntregaStore((s) => s.salvarPonto);
  const buscarPorCnpj = usePontosDeEntregaStore((s) => s.buscarPorCnpj);

  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);

  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [razaoSocialFachada, setRazaoSocialFachada] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null);

  const [buscandoCnpj, setBuscandoCnpj] = useState(false);
  const [capturandoLocalizacao, setCapturandoLocalizacao] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [editandoExistente, setEditandoExistente] = useState(false);

  useEffect(() => {
    verificarPermissaoLocalizacao().then(setLocationPermission);
  }, []);

  // Pré-carrega o formulário quando vem do modal de detalhes, via ?cnpjEditar=...
  useEffect(() => {
    if (!params.cnpjEditar) return;

    const existente = buscarPorCnpj(params.cnpjEditar);
    if (existente) {
      setCnpj(existente.cnpj);
      setRazaoSocial(existente.razaoSocial ?? '');
      setRazaoSocialFachada(existente.razaoSocialFachada ?? '');
      setTelefone(existente.telefone ?? '');
      setEndereco(existente.endereco);
      setCoordenadas(existente.coordenadas);
      setEditandoExistente(true);
    }
  }, [params.cnpjEditar]);

  const solicitarPermissao = async () => {
    const concedida = await solicitarPermissaoLocalizacao();
    setLocationPermission(concedida);
  };

  const buscarDadosOficiais = async () => {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
      Alert.alert('CNPJ inválido', 'Digite os 14 dígitos do CNPJ antes de buscar.');
      return;
    }

    setBuscandoCnpj(true);
    try {
      const dados = await consultarCnpj(cnpjLimpo);

      if (!dados) {
        Alert.alert('CNPJ não encontrado', 'Não localizamos esse CNPJ na Receita Federal.');
        return;
      }

      if (dados.situacaoCadastral !== 'ATIVA') {
        Alert.alert('Atenção', `Esse CNPJ está com situação "${dados.situacaoCadastral}" na Receita Federal.`);
      }

      setRazaoSocial(dados.razaoSocial);
      setTelefone(dados.telefone ?? '');
      setEndereco(dados.enderecoFormatado);
    } catch {
      Alert.alert('Erro', 'Não foi possível consultar o CNPJ agora. Tente novamente.');
    } finally {
      setBuscandoCnpj(false);
    }
  };

  const capturarLocalizacao = async () => {
    setCapturandoLocalizacao(true);
    try {
      const coords = await capturarLocalizacaoAtual();
      if (!coords) {
        Alert.alert('Sem permissão', 'Permita o acesso à localização para capturar o ponto.');
        return;
      }
      setCoordenadas(coords);
    } catch {
      Alert.alert('Erro', 'Não foi possível obter sua localização agora.');
    } finally {
      setCapturandoLocalizacao(false);
    }
  };

  const salvarEmpresa = async () => {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
      Alert.alert('CNPJ inválido', 'Digite os 14 dígitos do CNPJ antes de salvar.');
      return;
    }
    if (!razaoSocialFachada.trim() && !razaoSocial.trim()) {
      Alert.alert('Razão social obrigatória', 'Informe a razão social (da nota ou da fachada).');
      return;
    }
    if (!endereco.trim()) {
      Alert.alert('Endereço obrigatório', 'Informe o endereço antes de salvar.');
      return;
    }

    setSalvando(true);
    try {
      salvarPonto({
        cnpj,
        razaoSocial: razaoSocial || null,
        razaoSocialFachada: razaoSocialFachada || null,
        telefone: telefone || null,
        endereco,
        coordenadas,
      });

      Alert.alert(
        'Salvo!',
        editandoExistente
          ? 'As informações foram atualizadas.'
          : 'Ponto de entrega adicionado à sua biblioteca de endereços.'
      );
      resetFormulario();
      router.push('/(tabs)');
    } finally {
      setSalvando(false);
    }
  };

  const resetFormulario = () => {
    setCnpj('');
    setRazaoSocial('');
    setRazaoSocialFachada('');
    setTelefone('');
    setEndereco('');
    setCoordenadas(null);
    setEditandoExistente(false);
  };

  return {
    locationPermission,
    solicitarPermissao,
    cnpj,
    setCnpj,
    razaoSocial,
    setRazaoSocial,
    razaoSocialFachada,
    setRazaoSocialFachada,
    telefone,
    setTelefone,
    endereco,
    setEndereco,
    coordenadas,
    buscandoCnpj,
    capturandoLocalizacao,
    salvando,
    editandoExistente,
    buscarDadosOficiais,
    capturarLocalizacao,
    salvarEmpresa,
  };
}