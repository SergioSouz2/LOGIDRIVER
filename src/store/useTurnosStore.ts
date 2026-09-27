import type { TurnoFinalizado } from '@/components/CardTurno';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface TurnoRegistro extends TurnoFinalizado {
  id: string;
  criadoEm: string;
}

interface TurnosState {
  turnos: TurnoRegistro[];
  adicionarTurno: (turno: TurnoFinalizado) => void;
  removerTurno: (id: string) => void;
}

export const useTurnosStore = create<TurnosState>()(
  persist(
    (set) => ({
      turnos: [],

      adicionarTurno: (turno) => {
        const registro: TurnoRegistro = {
          ...turno,
          id: `${turno.data}-${turno.horaInicio}-${Date.now()}`,
          criadoEm: new Date().toISOString(),
        };
        set((state) => ({ turnos: [registro, ...state.turnos] }));
      },

      removerTurno: (id) => {
        set((state) => ({ turnos: state.turnos.filter((t) => t.id !== id) }));
      },
    }),
    {
      name: 'logidriver-turnos',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);