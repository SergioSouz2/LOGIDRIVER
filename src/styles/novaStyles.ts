import { theme } from '@/theme/themes';
import { StyleSheet } from 'react-native';

const { colors, radius } = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Tela de escolha (digitar CNPJ ou câmera) ─────────────
  choiceContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 24,
    paddingTop: 72,
  },
  choiceTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  choiceSub: {
    fontSize: 13,
    color: colors.textSub,
    marginBottom: 28,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 16,
    gap: 14,
    marginBottom: 14,
  },
  optionIconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTextWrap: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 3,
  },
  optionSub: {
    fontSize: 12,
    color: colors.textSub,
    lineHeight: 17,
  },

  // ── Link de voltar ────────────────────────────────────────
  backLink: {
    position: 'absolute',
    top: 56,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backLinkText: {
    fontSize: 13,
    color: colors.textSub,
    fontWeight: '600',
  },

  // ── Tela de permissão ────────────────────────────────────
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  permissionIcon: {
    width: 76,
    height: 76,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  permissionSub: {
    fontSize: 13,
    color: colors.textSub,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 19,
  },
  permissionBtn: {
    backgroundColor: colors.primary,
    height: 54,
    paddingHorizontal: 32,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Câmera ────────────────────────────────────────────────
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  hintBar: {
    marginTop: 56,
    marginHorizontal: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: 'rgba(10,13,20,0.65)',
    alignItems: 'center',
  },
  hintText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  frame: {
    alignSelf: 'center',
    width: '82%',
    aspectRatio: 0.7,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radius.lg,
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  closeBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: 'rgba(18,22,31,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuter: {
    width: 76,
    height: 76,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  spacer48: {
    width: 48,
  },

  // ── Preview / confirmação ────────────────────────────────
  previewImage: {
    flex: 1,
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 24,
    backgroundColor: 'rgba(10,13,20,0.85)',
  },
  previewActions: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeBtn: {
    flex: 1,
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  retakeBtnText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  useBtn: {
    flex: 1.4,
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  useBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },

  // ── Processando OCR ──────────────────────────────────────
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,13,20,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  processingText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});