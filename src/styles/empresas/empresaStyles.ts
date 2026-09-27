import { theme } from '@/theme/themes';
import { Dimensions, StyleSheet } from 'react-native';

const { colors, radius } = theme;
const { width: SCREEN_W } = Dimensions.get('window');

const GRID_PADDING = 20;
const GAP = 10;
const CARD_SIZE = (SCREEN_W - GRID_PADDING * 2 - GAP * 2) / 3;

export const empresaStyles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: GRID_PADDING,
    marginTop: 24,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
  },
  gridEmpty: {
    fontSize: 13,
    color: colors.textSub,
    textAlign: 'center',
    paddingVertical: 24,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  card: {
    width: CARD_SIZE,
    aspectRatio: 1,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 8,
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },

  // ── Modal de detalhes ─────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,13,20,0.75)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  modalCnpj: {
    fontSize: 13,
    color: colors.textSub,
    marginBottom: 16,
  },
  mapPreview: {
    width: '100%',
    height: 140,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    marginBottom: 16,
  },
  mapPreviewPlaceholder: {
    width: '100%',
    height: 140,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  mapPreviewPlaceholderText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSub,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  routeActions: {
  flexDirection: 'row',
  gap: 10,
  marginBottom: 16,
},
routeBtn: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  paddingVertical: 12,
  borderRadius: radius.md,
  borderWidth: 1,
  backgroundColor: colors.surface,
},
routeBtnText: {
  fontSize: 13,
  fontWeight: '600',
  color: colors.text,
},
});