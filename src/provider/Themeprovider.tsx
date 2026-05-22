// ============================================================
// ThemeProvider.tsx — LogiDriver
// ============================================================

import { theme, Theme } from "@/theme/themes";
import React, { createContext, useContext } from "react";

// ── Contexto ─────────────────────────────────────────────────

const ThemeContext = createContext<Theme | null>(null);

// ── Provider ─────────────────────────────────────────────────

interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Opcional: sobrescreve tokens específicos sem precisar
   * passar o objeto inteiro.
   *
   * @example
   * <ThemeProvider override={{ colors: { primary: "#FF6B00" } }}>
   */
  override?: DeepPartial<Theme>;
}

export function ThemeProvider({ children, override }: ThemeProviderProps) {
  const resolved = override ? deepMerge(theme, override) : theme;

  return (
    <ThemeContext.Provider value={resolved}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────

/**
 * Retorna os tokens do tema atual.
 *
 * @example
 * const { colors, font, radius } = useTheme();
 * <View style={{ backgroundColor: colors.bg }} />
 */
export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      "[useTheme] deve ser usado dentro de <ThemeProvider>.\n" +
      "Envolva a raiz do app: <ThemeProvider><App /></ThemeProvider>"
    );
  }

  return ctx;
}

// ── Utilitários internos ──────────────────────────────────────

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

function deepMerge<T extends object>(base: T, override: DeepPartial<T>): T {
  const result = { ...base };

  for (const key in override) {
    const baseVal = base[key];
    const overrideVal = override[key];

    if (
      overrideVal !== undefined &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      typeof baseVal === "object"
    ) {
      result[key] = deepMerge(baseVal as object, overrideVal as object) as T[typeof key];
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal as T[typeof key];
    }
  }

  return result;
}