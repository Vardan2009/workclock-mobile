import ThemedView from "./themedView";
import ThemedText from "./themedText";

import { useStyles } from "../../globalStyle";

import { useState } from "react";
import { Pressable } from "react-native";

export default function ThemedButton({
    children,
    onPress,
    disabled,
    style,
    textStyle,
    ...props
}) {
    const styles = useStyles();

    const [isPressed, setIsPressed] = useState(false);

    const onPressInternal = () => {
        if (disabled) return;
        onPress();
    };

    return (
        <Pressable
            style={[
                styles.button,
                style,
                (isPressed || disabled) && styles.buttonPressed,
                disabled && styles.buttonDisabled,
            ]}
            onPress={onPressInternal}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            {...props}
        >
            <ThemedText
                style={[
                    styles.buttonText,
                    textStyle,
                    (isPressed || disabled) && styles.buttonPressedText,
                ]}
            >
                {children}
            </ThemedText>
        </Pressable>
    );
}
