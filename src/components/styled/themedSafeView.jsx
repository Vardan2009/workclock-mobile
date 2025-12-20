import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../themeCtx";

export default function ThemedSafeView({ style, ...props }) {
    const { theme } = useTheme();

    return (
        <SafeAreaView
            style={[{ backgroundColor: theme.bg }, style]}
            {...props}
        />
    );
}
