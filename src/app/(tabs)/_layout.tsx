import { useTheme } from '@/provider/Themeprovider';
import { styles } from '@/styles/CustomTabBarStyles';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isCenter = route.name === 'nova';

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        if (isCenter) {
          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.centerBtn} activeOpacity={0.85}>
              <View style={[styles.centerCircle, { backgroundColor: colors.primary, borderRadius: radius.full }]}>
                <Ionicons name="add" size={32} color={colors.white} />
              </View>
              <Text style={[styles.centerLabel, { color: colors.textMuted }]}>Nova</Text>
            </TouchableOpacity>
          );
        }

        const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
          index:     isFocused ? 'home'          : 'home-outline',
          mapa:      isFocused ? 'map'            : 'map-outline',
          historico: isFocused ? 'document-text' : 'document-text-outline',
          perfil:    isFocused ? 'person'         : 'person-outline',
        };

        const labelMap: Record<string, string> = {
          index: 'Home', mapa: 'Mapa', historico: 'Histórico', perfil: 'Perfil',
        };

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem} activeOpacity={0.7}>
            <Ionicons
              name={iconMap[route.name] ?? 'ellipse-outline'}
              size={24}
              color={isFocused ? colors.primary : colors.textMuted}
            />
            <Text style={[styles.tabLabel, { color: isFocused ? colors.primary : colors.textMuted }]}>
              {labelMap[route.name] ?? options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index"     options={{ title: 'Home' }} />
      <Tabs.Screen name="mapa"      options={{ title: 'Mapa' }} />
      <Tabs.Screen name="nova"      options={{ title: 'Nova' }} />
      <Tabs.Screen name="historico" options={{ title: 'Histórico' }} />
      <Tabs.Screen name="perfil"    options={{ title: 'Perfil' }} />
    </Tabs>
  );
}

