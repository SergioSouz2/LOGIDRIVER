import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({  
tabBar: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    borderTopWidth: 1,
    paddingBottom: 8,
  },
  tabItem:    { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabLabel:   { fontSize: 11 },
  centerBtn:  { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  centerCircle: {
    width: 56, height: 56,
    alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5, shadowRadius: 8, elevation: 8,
  },
  centerLabel: { fontSize: 11, marginTop: 2 },

 })