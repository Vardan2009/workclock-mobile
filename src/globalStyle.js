import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "./themeCtx";

export function useStyles() {
    const { theme } = useTheme();

    return useMemo(
        () =>
            StyleSheet.create({
                page: {
                    flex: 1,
                    backgroundColor: theme.bg,
                },
                title: {
                    fontFamily: "BrandFont-Bold",
                    fontSize: 48,
                    color: theme.fg,
                    marginBottom: 16,
                },
                subtitle: {
                    fontFamily: "BrandFont-Bold",
                    fontSize: 24,
                    color: theme.fg,
                    marginBottom: 8,
                },
                text: {
                    fontFamily: "BrandFont-Regular",
                    color: theme.fg,
                    fontSize: 18,
                },
                logo: {
                    width: 150,
                    height: 30,
                    tintColor: theme.fg,
                    resizeMode: "contain",
                },
                button: {
                    flexDirection: "row",
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    marginVertical: 8,
                    borderRadius: 5,
                    backgroundColor: theme.accent1,
                    borderWidth: 1,
                    borderColor: theme.accent1,
                },
                buttonPressed: {
                    backgroundColor: "transparent",
                },
                buttonDisabled: {
                    opacity: 0.5,
                },
                buttonText: {
                    fontFamily: "BrandFont-Regular",
                    color: theme.bg,
                    fontSize: 18,
                },
                buttonPressedText: {
                    color: theme.accent1,
                },
            }),
        [theme],
    );
}
