import { ThemeProvider } from '@/provider/Themeprovider';
import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
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