import { theme } from '@/theme/themes';
import { StyleSheet } from 'react-native';

const { colors, radius } = theme;

export const cadastroStyles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  sub: {
    fontSize: 13,
    color: colors.textSub,
    marginBottom: 28,
    lineHeight: 18,
  },
  label: {
    fontSize: 12,
    color: colors.textSub,
    marginBottom: 6,
    marginTop: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.text,
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  gpsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginTop: 10,
    gap: 12,
  },
  gpsCardText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSub,
  },
  gpsCardValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '700',
  },
});