import { theme } from '@/theme/themes';
import { StyleSheet, Text, View } from 'react-native';




export default function HomeScreen() {
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, { backgroundColor: theme.colors.bg }]}>
      <Text>inicio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
