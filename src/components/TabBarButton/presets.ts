import { styles } from "@/styles/TabBarButtonStyles";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { TabBarButtonVariant } from "./types";

interface Preset {
  container: StyleProp<ViewStyle>;
  label: StyleProp<TextStyle>;
  iconSize: number;
  activeOpacity: number;
}

export const PRESETS = {
  default: {
    container: styles.tabItem,
    label: styles.tabLabel,
    iconSize: 24,
    activeOpacity: 0.7,
  },
  center: {
    container: styles.centerBtn,
    label: styles.centerLabel,
    iconSize: 32,
    activeOpacity: 0.85,
  },
} satisfies Record<TabBarButtonVariant, Preset>;
