import { theme } from '@/theme/themes';
import { StyleSheet } from 'react-native';

const { colors, radius } = theme;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },

  // ── Banner OCR ───────────────────────────────────────────
  ocrBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryGlow,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  ocrBannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },

  // ── Seções ───────────────────────────────────────────────
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSub,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  sectionSpacing: {
    marginTop: 28,
  },

  // ── Linha CNPJ + botão consultar ────────────────────────
  cnpjRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  cnpjInputWrapper: {
    flex: 1,
  },
  consultarBtn: {
    width: 52,
    height: 52,
    marginTop: 22, // alinha com a altura do input (compensa o label)
    borderRadius: radius.md,
    backgroundColor: colors.primaryGlow,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Textarea (observações) ──────────────────────────────
  textareaLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSub,
    marginBottom: 6,
  },
  textareaWrapper: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  textarea: {
    color: colors.text,
    fontSize: 14,
    minHeight: 90,
    textAlignVertical: 'top',
  },

  // ── Botão registrar ──────────────────────────────────────
  submitBtn: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Aviso de campos obrigatórios ────────────────────────
  requiredHint: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 10,
    textAlign: 'center',
  },
});