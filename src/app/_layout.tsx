import { ThemeProvider } from '@/provider/Themeprovider';
import { DMSans_400Regular, DMSans_700Bold, useFonts } from '@expo-google-fonts/dm-sans';
import { Stack } from 'expo-router';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();


export default function TabLayout() {

   const [loaded] = useFonts({ DMSans_400Regular, DMSans_700Bold });
     useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;


  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="nova/nova-entrega"
          options={{ presentation: 'modal', headerShown: true, title: 'Nova Entrega' }}
        />
        <Stack.Screen
          name="nova/consultar-cnpj"
          options={{ presentation: 'modal', headerShown: true, title: 'Consultar CNPJ' }}
        />
      </Stack>
    </ThemeProvider>
  );
}




