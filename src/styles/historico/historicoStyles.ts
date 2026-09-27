import { theme } from '@/theme/themes';
import { StyleSheet } from 'react-native';

const { colors, radius } = theme;

export const historicoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 10,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textSub,
    textAlign: 'center',
  },
  dataGroup: {
    marginBottom: 20,
  },
  dataLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  card: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardFrota: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  cardTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  timelineLabel: {
    fontSize: 12,
    color: colors.textSub,
    flex: 1,
  },
  timelineValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
});
