import { theme } from '@/theme/themes';
import { StyleSheet } from 'react-native';

const { colors, radius } = theme;

export const shared = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  retakeBtn: {
    flex: 1,
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  retakeBtnText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  useBtn: {
    flex: 1.4,
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  useBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});