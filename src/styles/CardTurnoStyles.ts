import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { padding: 18, borderWidth: 1, margin: 16 },
  title: { fontSize: 13, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timer: { fontSize: 32, fontWeight: '700', letterSpacing: 1 },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10 },
  btnLabel: { fontSize: 13, fontWeight: '600' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10, flexWrap: 'wrap' },
  footerText: { fontSize: 12 },
  lunchHint: { fontSize: 12 },
});