import { theme } from '@/theme/themes';
import { StyleSheet } from 'react-native';

const { colors } = theme;

export const mapaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  map: {
    flex: 1,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textSub,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 10,
    paddingHorizontal: 32,
  },
});