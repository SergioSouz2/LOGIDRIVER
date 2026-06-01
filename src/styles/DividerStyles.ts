import { theme } from '@/theme/themes';
import { StyleSheet } from "react-native";
const { colors, radius } = theme;

export const styles = StyleSheet.create({

    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        fontSize: 12,
        color: colors.textMuted,
    },


})