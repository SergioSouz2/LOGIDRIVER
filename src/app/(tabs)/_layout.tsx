import { TabBarButton } from "@/components/TabBarButton/TabBarButton";
import { TABS } from "@/constants/tabs";
import { useTheme } from "@/provider/Themeprovider";
import { styles } from "@/styles/CustomTabBarStyles";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: styles.tabBar.height + insets.bottom,
          paddingBottom: 8 + insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const config = TABS[route.name];
        if (!config) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name);
        };

        return (
          <TabBarButton
            key={route.key}
            variant={config.variant}
            label={config.label}
            icon={isFocused ? config.iconFocused : config.icon}
            focused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="mapa" options={{ title: "Mapa" }} />
      <Tabs.Screen name="nova" options={{ title: "Nova" }} />
      <Tabs.Screen name="historico" options={{ title: "Histórico" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
