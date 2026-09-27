import { useTheme } from '@/provider/Themeprovider';
import { notificarAgora, solicitarPermissaoNotificacoes } from '@/services/notifications';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '@/styles/CardTurnoStyles';

type Stage = 'idle' | 'working' | 'lunch' | 'finishing';

// valores reais (deixa comentado do lado, pra lembrar de reverter):
// const LUNCH_DURATION = 90 * 60; // 1h30 em segundos
// const AVISO_ALMOCO_RESTANTE = 10 * 60; // dispara notificação quando faltar 10 min

// valores de teste — REVERTER depois de validar:
const LUNCH_DURATION = 30; // 30 segundos, só pra teste
const AVISO_ALMOCO_RESTANTE = 20; // dispara aos 20s restantes (10s depois de iniciar o almoço)

const STAGE_CONFIG = {
  idle: {
    icon: 'play-circle' as const,
    label: 'Iniciar Turno',
    color: 'success' as const,
    colorBg: 'successBg' as const,
  },
  working: {
    icon: 'pause-circle' as const,
    label: 'Parada Almoço',
    color: 'warning' as const,
    colorBg: 'warningBg' as const,
  },
  lunch: {
    icon: 'play-circle' as const,
    label: 'Retomar',
    color: 'primary' as const,
    colorBg: 'primaryGlow' as const,
  },
  finishing: {
    icon: 'stop-circle' as const,
    label: 'Finalizar Turno',
    color: 'danger' as const,
    colorBg: 'dangerBg' as const,
  },
};

export interface TurnoFinalizado {
  data: string; // "YYYY-MM-DD"
  frota: string;
  horaInicio: string; // "HH:mm"
  horaPausaAlmoco: string | null;
  horaRetornoAlmoco: string | null;
  horaFim: string;
  totalTrabalhadoSegundos: number;
}

interface CardTurnoProps {
  frota: string;
  onFinalizar?: (turno: TurnoFinalizado) => void;
}

function formatarHora(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function formatarDataISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function CardTurno({ frota, onFinalizar }: CardTurnoProps) {
  const { colors, radius } = useTheme();

  const [stage, setStage] = useState<Stage>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [lunchLeft, setLunchLeft] = useState(LUNCH_DURATION);
  const [startTime, setStartTime] = useState<string>('--:--');

  // Timestamps reais capturados em cada transição, pra montar o registro do histórico
  const marcosRef = useRef<{
    data: string | null;
    inicio: Date | null;
    pausaAlmoco: Date | null;
    retornoAlmoco: Date | null;
  }>({
    data: null,
    inicio: null,
    pausaAlmoco: null,
    retornoAlmoco: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    solicitarPermissaoNotificacoes();
  }, []);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handlePress = () => {
    clearTimer();

    if (stage === 'idle') {
      const now = new Date();
      marcosRef.current = {
        data: formatarDataISO(now),
        inicio: now,
        pausaAlmoco: null,
        retornoAlmoco: null,
      };
      setStartTime(formatarHora(now));
      setElapsed(0);
      setStage('working');
    } else if (stage === 'working') {
      marcosRef.current.pausaAlmoco = new Date();
      setLunchLeft(LUNCH_DURATION);
      setStage('lunch');
    } else if (stage === 'lunch') {
      marcosRef.current.retornoAlmoco = new Date();
      setStage('finishing');
    } else if (stage === 'finishing') {
      const agora = new Date();
      const m = marcosRef.current;

      if (m.inicio && m.data) {
        onFinalizar?.({
          data: m.data,
          frota,
          horaInicio: formatarHora(m.inicio),
          horaPausaAlmoco: m.pausaAlmoco ? formatarHora(m.pausaAlmoco) : null,
          horaRetornoAlmoco: m.retornoAlmoco ? formatarHora(m.retornoAlmoco) : null,
          horaFim: formatarHora(agora),
          totalTrabalhadoSegundos: elapsed,
        });

        const h = Math.floor(elapsed / 3600);
        const min = Math.floor((elapsed % 3600) / 60);
        notificarAgora(
          'Turno finalizado',
          `Você trabalhou ${h}h${String(min).padStart(2, '0')}min hoje. Bom descanso!`
        );
      }

      setStage('idle');
      setElapsed(0);
      setLunchLeft(LUNCH_DURATION);
      setStartTime('--:--');
      marcosRef.current = { data: null, inicio: null, pausaAlmoco: null, retornoAlmoco: null };
      return;
    }
  };

  useEffect(() => {
    clearTimer();

    if (stage === 'working' || stage === 'finishing') {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }

    if (stage === 'lunch') {
      intervalRef.current = setInterval(() => {
        setLunchLeft((l) => {
          if (l === AVISO_ALMOCO_RESTANTE + 1) {
            notificarAgora('Almoço acabando', 'Faltam 10 minutos para retomar seu turno.');
          }

          if (l <= 1) {
            clearTimer();
            // Retorno automático do almoço também precisa capturar o timestamp real
            marcosRef.current.retornoAlmoco = new Date();
            setStage('finishing');
            return 0;
          }
          return l - 1;
        });
      }, 1000);
    }

    return clearTimer;
  }, [stage]);

  const fmt = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const cfg = STAGE_CONFIG[stage];
  const btnColor = colors[cfg.color];
  const btnColorBg = colors[cfg.colorBg];
  const displayTime = stage === 'idle' ? '00:00:00' : stage === 'lunch' ? fmt(lunchLeft) : fmt(elapsed);

  const stageLabel =
    stage === 'idle'
      ? 'Aguardando início'
      : stage === 'working'
        ? 'Turno em andamento'
        : stage === 'lunch'
          ? 'Intervalo de almoço'
          : 'Retornando do almoço';

  const timerColor = stage === 'lunch' ? colors.warning : stage === 'idle' ? colors.textMuted : colors.text;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.title, { color: colors.textSub }]}>{stageLabel}</Text>

      <View style={styles.row}>
        <Text style={[styles.timer, { color: timerColor }]}>{displayTime}</Text>

        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.8}
          style={[styles.btn, { backgroundColor: btnColorBg, borderRadius: radius.md }]}
        >
          <Ionicons name={cfg.icon} size={16} color={btnColor} />
          <Text style={[styles.btnLabel, { color: btnColor }]}>{cfg.label}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Ionicons name="time-outline" size={13} color={colors.primary} />
        <Text style={[styles.footerText, { color: colors.primary }]}>
          Início: {startTime} · Frota: {frota}
        </Text>

        {stage === 'lunch' && (
          <Text style={[styles.lunchHint, { color: colors.warning }]}>· Retoma automaticamente</Text>
        )}
      </View>
    </View>
  );
}