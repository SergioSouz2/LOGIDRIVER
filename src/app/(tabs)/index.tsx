import { useTheme } from '@/provider/Themeprovider';
import { ScrollView, Text } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>Home</Text>
    </ScrollView>
  );
}