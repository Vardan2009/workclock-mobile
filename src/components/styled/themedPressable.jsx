import { Pressable } from "react-native";
import { useState } from "react";

export default function ThemedPressable({
    style,
    onPressIn,
    onPressOut,
    ...props
}) {
    const [pressed, setPressed] = useState(false);

    const onPressInIternal = (...args) => {
        setPressed(true);
        if (onPressIn) onPressIn(...args);
    };

    const onPressOutInternal = (...args) => {
        setPressed(false);
        if (onPressOut) onPressOut(...args);
    };

    return (
        <Pressable
            onPressIn={onPressInIternal}
            onPressOut={onPressOutInternal}
            style={[style, pressed && { opacity: 0.5 }]}
            {...props}
        />
    );
}
