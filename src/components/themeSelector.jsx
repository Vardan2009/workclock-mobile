import { View, Text, Pressable } from "react-native";
import { useTheme } from "../themeCtx";
import { useStyles } from "../globalStyle";

import { useEffect } from "react";

export default function ThemeSelector() {
    const { theme, themeName, themeNames, themeEmojis, setThemeName } =
        useTheme();

    const style = useStyles();

    return (
        <View
            style={{
                flexDirection: "row",
                gap: 12,
                marginVertical: 20,
            }}
        >
            {themeNames.map((name, index) => {
                const active = name === themeName;

                return (
                    <Pressable
                        key={name}
                        onPress={() => setThemeName(name)}
                        style={[
                            style.button,
                            {
                                backgroundColor: active
                                    ? theme.accent1
                                    : theme.bg,
                                width: 50,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color: active ? theme.bg : theme.fg,
                                fontWeight: active ? "bold" : "normal",
                            }}
                        >
                            {themeEmojis[index]}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
