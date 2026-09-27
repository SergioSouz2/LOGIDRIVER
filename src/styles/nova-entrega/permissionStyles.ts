import { theme } from '@/theme/themes';
import { StyleSheet } from 'react-native';

const { colors, radius } = theme;

export const permissionStyles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  permissionIcon: {
    width: 76,
    height: 76,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  permissionSub: {
    fontSize: 13,
    color: colors.textSub,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 19,
  },
  permissionBtn: {
    backgroundColor: colors.primary,
    height: 54,
    paddingHorizontal: 32,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});