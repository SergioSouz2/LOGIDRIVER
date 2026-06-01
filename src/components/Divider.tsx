import { styles } from "@/styles/DividerStyles";
import { View } from "react-native";

export function Divider() {
    return (
        <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
        </View>
    )
}