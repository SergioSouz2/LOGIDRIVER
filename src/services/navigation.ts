import { Linking, Platform } from 'react-native';

interface Coordenadas {
  latitude: number;
  longitude: number;
}

/**
 * Abre o Waze com rota até o destino. Se o app não estiver instalado,
 * cai automaticamente na versão web (abre no navegador).
 */
export async function abrirNoWaze(coords: Coordenadas): Promise<void> {
  const appUrl = `waze://ul?ll=${coords.latitude},${coords.longitude}&navigate=yes`;
  const webUrl = `https://waze.com/ul?ll=${coords.latitude},${coords.longitude}&navigate=yes`;

  const suportado = await Linking.canOpenURL(appUrl);
  await Linking.openURL(suportado ? appUrl : webUrl);
}

/**
 * Abre o Google Maps com rota até o destino. No Android, tenta o app nativo
 * primeiro (via URI "google.navigation"); no iOS, tenta o esquema comgooglemaps.
 * Em ambos, cai no link web se o app não estiver instalado.
 */
export async function abrirNoGoogleMaps(coords: Coordenadas): Promise<void> {
  const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}&travelmode=driving`;

  if (Platform.OS === 'android') {
    const appUrl = `google.navigation:q=${coords.latitude},${coords.longitude}`;
    const suportado = await Linking.canOpenURL(appUrl);
    await Linking.openURL(suportado ? appUrl : webUrl);
    return;
  }

  const appUrl = `comgooglemaps://?daddr=${coords.latitude},${coords.longitude}&directionsmode=driving`;
  const suportado = await Linking.canOpenURL(appUrl);
  await Linking.openURL(suportado ? appUrl : webUrl);
}