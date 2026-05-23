import { ThemeProvider } from '@/provider/Themeprovider';
import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <ThemeProvider>
       <Stack screenOptions={{ headerShown: false }}  />
    </ThemeProvider>
  );
}