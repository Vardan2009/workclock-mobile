import { TextInput } from "react-native";
import { useStyles } from "../../globalStyle";

export default function ThemedInput({ style, ...props }) {
    const styles = useStyles();
    return <TextInput style={[styles.input, style]} {...props} />;
}
