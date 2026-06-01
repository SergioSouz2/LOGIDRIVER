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
  },

  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
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