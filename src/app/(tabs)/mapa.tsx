import { useTheme } from '@/provider/Themeprovider';
import { usePontosDeEntregaStore } from '@/store/usePontosDeEntregaStore';
import { mapaStyles } from '@/styles/mapa/mapaStyles';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function gerarHtmlDoMapa(pontos: Array<{ lat: number; lng: number; nome: string; endereco: string }>) {
  const marcadoresJs = pontos
    .map(
      (p) => `
      L.marker([${p.lat}, ${p.lng}])
        .addTo(map)
        .bindPopup(${JSON.stringify(`<b>${p.nome}</b><br>${p.endereco}`)});
    `
    )
    .join('\n');

  const centro = pontos.length > 0 ? [pontos[0].lat, pontos[0].lng] : [-15.7801, -47.9292];

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          const map = L.map('map').setView([${centro[0]}, ${centro[1]}], ${pontos.length > 0 ? 13 : 11});

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(map);

          ${marcadoresJs}

          ${
            pontos.length > 1
              ? `
            const grupo = L.featureGroup([${pontos.map((_, i) => `map._layers[Object.keys(map._layers)[${i}]]`).join(', ')}]);
          `
              : ''
          }
        </script>
      </body>
    </html>
  `;
}

export default function MapaScreen() {
  const { colors } = useTheme();
  const pontos = usePontosDeEntregaStore((s) => s.pontos);

  const pontosComCoordenadas = useMemo(
    () =>
      pontos
        .filter((p) => p.coordenadas)
        .map((p) => ({
          lat: p.coordenadas!.latitude,
          lng: p.coordenadas!.longitude,
          nome: p.razaoSocialFachada || p.razaoSocial || p.cnpj,
          endereco: p.endereco,
        })),
    [pontos]
  );

  const html = useMemo(() => gerarHtmlDoMapa(pontosComCoordenadas), [pontosComCoordenadas]);

  if (pontosComCoordenadas.length === 0) {
    return (
      <View style={[mapaStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Ionicons name="location-outline" size={28} color={colors.textMuted} />
        <Text style={mapaStyles.emptyText}>
          Nenhum ponto com localização GPS ainda.{'\n'}Cadastre uma empresa capturando a
          localização.
        </Text>
      </View>
    );
  }

  return (
    <View style={mapaStyles.container}>
      <WebView
        source={{ html }}
        style={mapaStyles.map}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}