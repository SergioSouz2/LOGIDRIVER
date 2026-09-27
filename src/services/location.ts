import * as Location from 'expo-location';

export interface Coordenadas {
  latitude: number;
  longitude: number;
}

export async function solicitarPermissaoLocalizacao(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function verificarPermissaoLocalizacao(): Promise<boolean> {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === 'granted';
}

/**
 * Captura a posição atual do dispositivo com alta precisão.
 * Ideal pra usar quando o motorista está fisicamente no local da entrega.
 */
export async function capturarLocalizacaoAtual(): Promise<Coordenadas | null> {
  const temPermissao = await verificarPermissaoLocalizacao();
  if (!temPermissao) return null;

  const posicao = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    latitude: posicao.coords.latitude,
    longitude: posicao.coords.longitude,
  };
}