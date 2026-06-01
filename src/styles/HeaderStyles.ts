import { theme } from '@/theme/themes';
import { StyleSheet } from 'react-native';

const { colors, radius } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.bg 
    },

    greeting: {
        fontSize: 14,
        color: colors.text
    },

    name: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.text

    },

    notificação: {
        width: 42, height: 42,
        borderRadius: radius.md,
        backgroundColor: colors.surfaceAlt,
        alignItems: 'center',
        justifyContent: 'center'

    },

    avatar:{
        width: 42, height: 42, 
        borderRadius: radius.full, 
        backgroundColor: colors.primary, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    initials:{
        color: colors.white, 
        fontWeight: '700', 
        fontSize: 14
    }

});