import type { Coordenadas } from '@/services/location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface PontoDeEntrega {
  id: string; // CNPJ limpo (só dígitos), chave única
  cnpj: string;
  razaoSocial: string | null;        // oficial, vindo da Receita/BrasilAPI
  razaoSocialFachada: string | null; // como está escrito na fachada, digitado manualmente
  telefone: string | null;
  endereco: string;
  coordenadas: Coordenadas | null;   // capturada por GPS no local
  criadoEm: string;
  atualizadoEm: string;
}

interface PontosDeEntregaState {
  pontos: PontoDeEntrega[];
  salvarPonto: (dados: Omit<PontoDeEntrega, 'id' | 'criadoEm' | 'atualizadoEm'>) => void;
  removerPonto: (id: string) => void;
  buscarPorCnpj: (cnpj: string) => PontoDeEntrega | undefined;
}

function limparCnpj(cnpj: string): string {
  return cnpj.replace(/\D/g, '');
}

export const usePontosDeEntregaStore = create<PontosDeEntregaState>()(
  persist(
    (set, get) => ({
      pontos: [],

      salvarPonto: (dados) => {
        const id = limparCnpj(dados.cnpj);
        const agora = new Date().toISOString();
        const existente = get().pontos.find((p) => p.id === id);

        const pontoAtualizado: PontoDeEntrega = {
          id,
          cnpj: dados.cnpj,
          razaoSocial: dados.razaoSocial,
          razaoSocialFachada: dados.razaoSocialFachada,
          telefone: dados.telefone,
          endereco: dados.endereco,
          coordenadas: dados.coordenadas,
          criadoEm: existente?.criadoEm ?? agora,
          atualizadoEm: agora,
        };

        set((state) => ({
          pontos: existente
            ? state.pontos.map((p) => (p.id === id ? pontoAtualizado : p))
            : [...state.pontos, pontoAtualizado],
        }));
      },

      removerPonto: (id) => {
        set((state) => ({ pontos: state.pontos.filter((p) => p.id !== id) }));
      },

      buscarPorCnpj: (cnpj) => {
        const id = limparCnpj(cnpj);
        return get().pontos.find((p) => p.id === id);
      },
    }),
    {
      name: 'logidriver-pontos-entrega',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);