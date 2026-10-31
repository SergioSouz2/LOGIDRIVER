import type {
    IconName,
    TabBarButtonVariant,
} from "@/components/TabBarButton/types";

export interface TabConfig {
  label: string;
  icon: IconName;
  iconFocused: IconName;
  variant?: TabBarButtonVariant;
}

export const TABS: Record<string, TabConfig> = {
  index: { label: "Home", icon: "home-outline", iconFocused: "home" },
  mapa: { label: "Mapa", icon: "map-outline", iconFocused: "map" },
  nova: { label: "Nova", icon: "add", iconFocused: "add", variant: "center" },
  historico: {
    label: "Histórico",
    icon: "document-text-outline",
    iconFocused: "document-text",
  },
  perfil: { label: "Perfil", icon: "person-outline", iconFocused: "person" },
};
