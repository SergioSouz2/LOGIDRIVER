import { useTheme } from "@/provider/Themeprovider";
import { styles } from "@/styles/TabBarButtonStyles";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { PRESETS } from "./presets";
import type { IconName, TabBarButtonVariant } from "./types";

interface TabBarButtonProps {
  variant?: TabBarButtonVariant;
  label: string;
  icon: IconName;
  focused?: boolean;
  onPress: () => void;
}

export function TabBarButton({
  variant = "default",
  label,
  icon,
  focused = false,
  onPress,
}: TabBarButtonProps) {
  const { colors, radius } = useTheme();
  const preset = PRESETS[variant];
  const isCenter = variant === "center";
  const tint = focused ? colors.primary : colors.textMuted;

  const iconNode = (
    <Ionicons
      name={icon}
      size={preset.iconSize}
      color={isCenter ? colors.white : tint}
    />
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={preset.container}
      activeOpacity={preset.activeOpacity}
    >
      {isCenter ? (
        <View
          style={[
            styles.centerCircle,
            {
              backgroundColor: colors.primary,
              borderRadius: radius.full,
              shadowColor: colors.primary,
            },
          ]}
        >
          {iconNode}
        </View>
      ) : (
        iconNode
      )}
      <Text
        style={[preset.label, { color: isCenter ? colors.textMuted : tint }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
