import { useTheme } from '@/provider/Themeprovider';
import { styles } from '@/styles/HeaderStyles';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
    name: string;
    greeting?: string;
    onNotification?: () => void;
    onProfile?: () => void;
}

export function Header({ name, greeting = 'Bom dia 👋', onNotification, onProfile }: HeaderProps) {
    const { colors, radius } = useTheme();

    const initials = name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <View style={styles.container}>

            {/* Texto esquerdo */}
            <View>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.name}>{name}</Text>
            </View>

            {/* Botões direita */}
            <View style={{ flexDirection: 'row', gap: 10 }}>

                {/* Notificação */}
                <TouchableOpacity
                    onPress={onNotification}
                    activeOpacity={0.8}
                    style={styles.notificação}
                >
                    <Ionicons name="notifications" size={20} color="#FFBF00" />
                </TouchableOpacity>

                {/* Avatar */}
                <TouchableOpacity
                    onPress={onProfile}
                    activeOpacity={0.8}
                    style={styles.avatar}
                >
                    <Text style={styles.initials}>{initials}</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}



