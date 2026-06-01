import { theme } from '@/theme/themes';
import { StyleSheet } from "react-native";
const { colors, radius } = theme;

export const styles = StyleSheet.create({
    label: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textSub,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    height: 52,
    paddingHorizontal: 14,
    marginBottom: 16,
    gap: 10,
  },
  inputIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },



})

