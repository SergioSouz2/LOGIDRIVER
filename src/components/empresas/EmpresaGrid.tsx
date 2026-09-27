import type { PontoDeEntrega } from '@/store/usePontosDeEntregaStore';
import { usePontosDeEntregaStore } from '@/store/usePontosDeEntregaStore';
import { empresaStyles } from '@/styles/empresas/empresaStyles';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { EmpresaCard } from './EmpresaCard';
import { EmpresaDetalheModal } from './EmpresaDetalheModal';

export function EmpresaGrid() {
  const pontos = usePontosDeEntregaStore((s) => s.pontos);
  const [selecionado, setSelecionado] = useState<PontoDeEntrega | null>(null);

  return (
    <View style={empresaStyles.gridContainer}>
      <Text style={empresaStyles.gridTitle}>Empresas cadastradas</Text>

      {pontos.length === 0 ? (
        <Text style={empresaStyles.gridEmpty}>
          Nenhuma empresa cadastrada ainda. Toque em "Nova" para adicionar.
        </Text>
      ) : (
        <View style={empresaStyles.gridWrap}>
          {pontos.map((ponto) => (
            <EmpresaCard key={ponto.id} ponto={ponto} onPress={() => setSelecionado(ponto)} />
          ))}
        </View>
      )}

      <EmpresaDetalheModal ponto={selecionado} onFechar={() => setSelecionado(null)} />
    </View>
  );
}