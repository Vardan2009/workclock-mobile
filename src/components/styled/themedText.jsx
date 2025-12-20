import { Text } from "react-native";
import { useStyles } from "../../globalStyle";

export default function ThemedText({ style, ...props }) {
    const styles = useStyles();
    return <Text style={[styles.text, style]} {...props} />;
}
