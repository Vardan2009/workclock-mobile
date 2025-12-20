import { useTheme } from "../../themeCtx";
import { View } from "react-native";

export default function ThemedView({ style, ...props }) {
    const { theme } = useTheme();

    return <View style={[{ backgroundColor: theme.bg }, style]} {...props} />;
}
