import { useTheme } from '@/provider/Themeprovider';
import { abrirNoGoogleMaps, abrirNoWaze } from '@/services/navigation';
import type { PontoDeEntrega } from '@/store/usePontosDeEntregaStore';
import { empresaStyles } from '@/styles/empresas/empresaStyles';
import { shared } from '@/styles/nova-entrega/shared';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface EmpresaDetalheModalProps {
  ponto: PontoDeEntrega | null;
  onFechar: () => void;
}

function gerarHtmlPreview(lat: number, lng: number, nome: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
          .leaflet-control-attribution { display: none; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          const map = L.map('map', {
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
          }).setView([${lat}, ${lng}], 16);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

          L.marker([${lat}, ${lng}]).addTo(map).bindPopup(${JSON.stringify(nome)});
        </script>
      </body>
    </html>
  `;
}

export function EmpresaDetalheModal({ ponto, onFechar }: EmpresaDetalheModalProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const nomeExibicao = ponto ? ponto.razaoSocialFachada || ponto.razaoSocial || 'Sem razão social' : '';

  const htmlPreview = useMemo(() => {
    if (!ponto?.coordenadas) return null;
    return gerarHtmlPreview(ponto.coordenadas.latitude, ponto.coordenadas.longitude, nomeExibicao);
  }, [ponto, nomeExibicao]);

  if (!ponto) return null;

  const handleEditar = () => {
    onFechar();
    router.push({ pathname: '/(tabs)/nova', params: { cnpjEditar: ponto.cnpj } });
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onFechar}>
      <TouchableWithoutFeedback onPress={onFechar}>
        <View style={empresaStyles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={empresaStyles.modalSheet}>
              <View style={empresaStyles.modalHandle} />

              <Text style={empresaStyles.modalTitle}>{nomeExibicao}</Text>
              <Text style={empresaStyles.modalCnpj}>{ponto.cnpj}</Text>

              {htmlPreview ? (
                <View style={empresaStyles.mapPreview}>
                  <WebView
                    source={{ html: htmlPreview }}
                    style={{ flex: 1, borderRadius: 12 }}
                    originWhitelist={['*']}
                    javaScriptEnabled
                    scrollEnabled={false}
                  />
                </View>
              ) : (
                <View style={empresaStyles.mapPreviewPlaceholder}>
                  <Ionicons name="location-outline" size={24} color={colors.textMuted} />
                  <Text style={empresaStyles.mapPreviewPlaceholderText}>
                    Sem localização GPS registrada
                  </Text>
                </View>
              )}


              {ponto.coordenadas && (
                <View style={empresaStyles.routeActions}>
                  <TouchableOpacity
                    onPress={() => abrirNoWaze(ponto.coordenadas!)}
                    activeOpacity={0.85}
                    style={[empresaStyles.routeBtn, { borderColor: colors.border }]}
                  >
                    <Ionicons name="navigate-outline" size={18} color={colors.text} />
                    <Text style={empresaStyles.routeBtnText}>Waze</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => abrirNoGoogleMaps(ponto.coordenadas!)}
                    activeOpacity={0.85}
                    style={[empresaStyles.routeBtn, { borderColor: colors.border }]}
                  >
                    <Ionicons name="map-outline" size={18} color={colors.text} />
                    <Text style={empresaStyles.routeBtnText}>Google Maps</Text>
                  </TouchableOpacity>
                </View>
              )}

              {ponto.razaoSocial && (
                <View style={empresaStyles.infoRow}>
                  <Ionicons name="document-text-outline" size={18} color={colors.textSub} />
                  <View>
                    <Text style={empresaStyles.infoLabel}>Razão Social (oficial)</Text>
                    <Text style={empresaStyles.infoValue}>{ponto.razaoSocial}</Text>
                  </View>
                </View>
              )}

              <View style={empresaStyles.infoRow}>
                <Ionicons name="location-outline" size={18} color={colors.textSub} />
                <View style={{ flex: 1 }}>
                  <Text style={empresaStyles.infoLabel}>Endereço</Text>
                  <Text style={empresaStyles.infoValue}>{ponto.endereco}</Text>
                </View>
              </View>

              {ponto.telefone && (
                <View style={empresaStyles.infoRow}>
                  <Ionicons name="call-outline" size={18} color={colors.textSub} />
                  <View>
                    <Text style={empresaStyles.infoLabel}>Telefone</Text>
                    <Text style={empresaStyles.infoValue}>{ponto.telefone}</Text>
                  </View>
                </View>
              )}

              <View style={empresaStyles.modalActions}>
                <TouchableOpacity onPress={onFechar} activeOpacity={0.85} style={shared.retakeBtn}>
                  <Ionicons name="close" size={18} color={colors.text} />
                  <Text style={shared.retakeBtnText}>Fechar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleEditar} activeOpacity={0.85} style={shared.useBtn}>
                  <Ionicons name="create-outline" size={18} color={colors.white} />
                  <Text style={shared.useBtnText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}