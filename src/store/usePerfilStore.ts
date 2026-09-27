import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Perfil {
  nome: string;
  modeloCarro: string;
  placa: string;
}

interface PerfilState extends Perfil {
  salvarPerfil: (dados: Perfil) => void;
}

export const usePerfilStore = create<PerfilState>()(
  persist(
    (set) => ({
      nome: '',
      modeloCarro: '',
      placa: '',

      salvarPerfil: (dados) => set(dados),
    }),
    {
      name: 'logidriver-perfil',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

/**
 * Monta a string "Modelo: PLACA" usada na Home e no Histórico.
 * Se o perfil ainda não foi preenchido, cai num fallback neutro.
 */
export function formatarFrota(modeloCarro: string, placa: string): string {
  if (!modeloCarro && !placa) return 'Veículo não cadastrado';
  if (!placa) return modeloCarro;
  if (!modeloCarro) return placa.toUpperCase();
  return `${modeloCarro}: ${placa.toUpperCase()}`;
}