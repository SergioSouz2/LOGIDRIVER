import { ThemeProvider } from '@/provider/Themeprovider';
import React from 'react';
import HomeScreen from '.';

export default function TabLayout() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}