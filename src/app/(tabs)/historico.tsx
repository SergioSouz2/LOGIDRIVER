import { useTheme } from '@/provider/Themeprovider';
import type { TurnoRegistro } from '@/store/useTurnosStore';
import { useTurnosStore } from '@/store/useTurnosStore';
import { historicoStyles } from '@/styles/historico/historicoStyles';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';

function formatarDataExibicao(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split('-');
  const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
  return data.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
}

function formatarDuracao(segundos: number): string {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  return `${h}h${String(m).padStart(2, '0')}min`;
}

function agruparPorData(turnos: TurnoRegistro[]): Array<{ data: string; turnos: TurnoRegistro[] }> {
  const grupos = new Map<string, TurnoRegistro[]>();

  for (const turno of turnos) {
    const lista = grupos.get(turno.data) ?? [];
    lista.push(turno);
    grupos.set(turno.data, lista);
  }

  return Array.from(grupos.entries())
    .map(([data, turnos]) => ({ data, turnos }))
    .sort((a, b) => (a.data < b.data ? 1 : -1)); // mais recente primeiro
}

export default function HistoricoScreen() {
  const { colors } = useTheme();
  const turnos = useTurnosStore((s) => s.turnos);

  const grupos = useMemo(() => agruparPorData(turnos), [turnos]);

  return (
    <ScrollView style={historicoStyles.container} contentContainerStyle={historicoStyles.content}>
      <Text style={historicoStyles.screenTitle}>Histórico de Turnos</Text>

      {grupos.length === 0 ? (
        <View style={historicoStyles.emptyWrap}>
          <Ionicons name="time-outline" size={28} color={colors.textMuted} />
          <Text style={historicoStyles.emptyText}>
            Nenhum turno finalizado ainda.{'\n'}Os turnos aparecem aqui assim que você finalizar um.
          </Text>
        </View>
      ) : (
        grupos.map((grupo) => (
          <View key={grupo.data} style={historicoStyles.dataGroup}>
            <Text style={historicoStyles.dataLabel}>{formatarDataExibicao(grupo.data)}</Text>

            {grupo.turnos.map((turno) => (
              <View key={turno.id} style={historicoStyles.card}>
                <View style={historicoStyles.cardHeader}>
                  <Text style={historicoStyles.cardFrota}>Frota: {turno.frota}</Text>
                  <Text style={historicoStyles.cardTotal}>
                    {formatarDuracao(turno.totalTrabalhadoSegundos)}
                  </Text>
                </View>

                <View style={historicoStyles.timelineRow}>
                  <Ionicons name="play-outline" size={14} color={colors.success} />
                  <Text style={historicoStyles.timelineLabel}>Início do turno</Text>
                  <Text style={historicoStyles.timelineValue}>{turno.horaInicio}</Text>
                </View>

                {turno.horaPausaAlmoco && (
                  <View style={historicoStyles.timelineRow}>
                    <Ionicons name="pause-outline" size={14} color={colors.warning} />
                    <Text style={historicoStyles.timelineLabel}>Parada para almoço</Text>
                    <Text style={historicoStyles.timelineValue}>{turno.horaPausaAlmoco}</Text>
                  </View>
                )}

                {turno.horaRetornoAlmoco && (
                  <View style={historicoStyles.timelineRow}>
                    <Ionicons name="play-outline" size={14} color={colors.primary} />
                    <Text style={historicoStyles.timelineLabel}>Retorno do almoço</Text>
                    <Text style={historicoStyles.timelineValue}>{turno.horaRetornoAlmoco}</Text>
                  </View>
                )}

                <View style={historicoStyles.timelineRow}>
                  <Ionicons name="stop-outline" size={14} color={colors.danger} />
                  <Text style={historicoStyles.timelineLabel}>Fim do turno</Text>
                  <Text style={historicoStyles.timelineValue}>{turno.horaFim}</Text>
                </View>
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
}