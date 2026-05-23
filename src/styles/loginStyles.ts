import { theme } from '@/theme/themes';
import { StyleSheet } from "react-native";

const { colors, radius } = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
  },
  logoArea: {
    alignItems: "center",
    paddingTop: 72,
    paddingBottom: 36,
  },
  logoBox: {},
  logoEmoji: {
    fontSize: 34,
  },
  appName: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: 3,
  },
  appSub: {
    fontSize: 11,
    color: colors.textSub,
    letterSpacing: 6,
    marginTop: 4,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: 1,
  },
  formSub: {
    fontSize: 13,
    color: colors.textSub,
    marginTop: 4,
    marginBottom: 28,
  },
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
  eyeBtn: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 12,
    color: colors.primary,
  },
  loginBtn: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  loginBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
    marginBottom: 40,
  },
  googleIcon: {
    fontSize: 20,
  },
  googleText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
});