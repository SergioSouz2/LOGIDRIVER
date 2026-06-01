import { useTheme } from '@/provider/Themeprovider';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Stage = 'idle' | 'working' | 'lunch' | 'finishing';

const LUNCH_DURATION = 90 * 60; // 1h30 em segundos

const STAGE_CONFIG = {
  idle: {
    icon:  'play-circle'      as const,
    label: 'Iniciar Turno',
    color: 'success'          as const,
    colorBg: 'successBg'      as const,
  },
  working: {
    icon:  'pause-circle'     as const,
    label: 'Parada Almoço',
    color: 'warning'          as const,
    colorBg: 'warningBg'      as const,
  },
  lunch: {
    icon:  'play-circle'      as const,
    label: 'Retomar',
    color: 'primary'          as const,
    colorBg: 'primaryGlow'    as const,
  },
  finishing: {
    icon:  'stop-circle'      as const,
    label: 'Finalizar Turno',
    color: 'danger'           as const,
    colorBg: 'dangerBg'       as const,
  },
};

interface CardTurnoProps {
  frota: string;
  onFinalizar?: (totalSeconds: number) => void;
}

export function CardTurno({ frota, onFinalizar }: CardTurnoProps) {
  const { colors, radius } = useTheme();

  const [stage, setStage]         = useState<Stage>('idle');
  const [elapsed, setElapsed]     = useState(0);          // cronômetro ↑
  const [lunchLeft, setLunchLeft] = useState(LUNCH_DURATION); // contagem ↓
  const [startTime, setStartTime] = useState<string>('--:--');

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // ── Lógica dos estágios ───────────────────────────────────
  const handlePress = () => {
    clearTimer();

    if (stage === 'idle') {
      const now = new Date();
      setStartTime(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      setElapsed(0);
      setStage('working');

    } else if (stage === 'working') {
      setLunchLeft(LUNCH_DURATION);
      setStage('lunch');

    } else if (stage === 'lunch') {
      setStage('finishing');

    } else if (stage === 'finishing') {
      onFinalizar?.(elapsed);
      // reset
      setStage('idle');
      setElapsed(0);
      setLunchLeft(LUNCH_DURATION);
      setStartTime('--:--');
      return;
    }
  };

  // ── Timers ────────────────────────────────────────────────
  useEffect(() => {
    clearTimer();

    if (stage === 'working' || stage === 'finishing') {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }

    if (stage === 'lunch') {
      intervalRef.current = setInterval(() => {
        setLunchLeft((l) => {
          if (l <= 1) {
            clearTimer();
            setStage('finishing');
            return 0;
          }
          return l - 1;
        });
      }, 1000);
    }

    return clearTimer;
  }, [stage]);

  // ── Formatadores ──────────────────────────────────────────
  const fmt = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // ── Derivados de UI ───────────────────────────────────────
  const cfg         = STAGE_CONFIG[stage];
  const btnColor    = colors[cfg.color];
  const btnColorBg  = colors[cfg.colorBg];
  const displayTime = stage === 'idle'  ? '00:00:00'
                    : stage === 'lunch' ? fmt(lunchLeft)
                    : fmt(elapsed);

  const stageLabel  = stage === 'idle'     ? 'Aguardando início'
                    : stage === 'working'  ? 'Turno em andamento'
                    : stage === 'lunch'    ? 'Intervalo de almoço'
                    : 'Retornando do almoço';

  const timerColor  = stage === 'lunch'    ? colors.warning
                    : stage === 'idle'     ? colors.textMuted
                    : colors.text;

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg, borderColor: colors.border }]}>

      <Text style={[styles.title, { color: colors.textSub }]}>{stageLabel}</Text>

      <View style={styles.row}>
        <Text style={[styles.timer, { color: timerColor }]}>{displayTime}</Text>

        {/* Botão */}
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.8}
          style={[styles.btn, { backgroundColor: btnColorBg, borderRadius: radius.md }]}
        >
          <Ionicons name={cfg.icon} size={16} color={btnColor} />
          <Text style={[styles.btnLabel, { color: btnColor }]}>{cfg.label}</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Ionicons name="time-outline" size={13} color={colors.primary} />
        <Text style={[styles.footerText, { color: colors.primary }]}>
          Início: {startTime} · Frota: {frota}
        </Text>

        {stage === 'lunch' && (
          <Text style={[styles.lunchHint, { color: colors.warning }]}>
            · Retoma automaticamente
          </Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:  { padding: 18, borderWidth: 1, margin: 16 },
  title:      { fontSize: 13, marginBottom: 8 },
  row:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timer:      { fontSize: 32, fontWeight: '700', letterSpacing: 1 },
  btn:        { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10 },
  btnLabel:   { fontSize: 13, fontWeight: '600' },
  footer:     { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10, flexWrap: 'wrap' },
  footerText: { fontSize: 12, },
  lunchHint:  { fontSize: 12 },
});