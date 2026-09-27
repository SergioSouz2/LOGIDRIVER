import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function solicitarPermissaoNotificacoes(): Promise<boolean> {
  const { status: statusAtual } = await Notifications.getPermissionsAsync();

  if (statusAtual !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return false;
  }

  // Canal obrigatório no Android 8+ pra som/vibração/importância funcionarem de verdade
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('turnos', {
      name: 'Turnos e Almoço',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default',
    });
  }

  return true;
}

export async function notificarAgora(titulo: string, corpo: string): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: corpo,
      sound: true,
    },
    trigger: null,
  });
}