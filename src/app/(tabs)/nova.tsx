import { StyleSheet, Text, View } from 'react-native';

export default function NovaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nova</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 18 },
});