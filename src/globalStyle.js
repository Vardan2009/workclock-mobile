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
                    borderColor: "transparent",
                },
                buttonSquare: {
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                },
                buttonOutline: {
                    backgroundColor: "transparent",
                    borderColor: theme.accent1,
                },
                buttonOutlineText: {
                    color: theme.accent1,
                },
                buttonPressed: {
                    backgroundColor: "transparent",
                    borderColor: theme.accent1,
                    opacity: 0.5,
                },
                buttonDisabled: {
                    opacity: 0.3,
                },
                buttonText: {
                    fontFamily: "BrandFont-Regular",
                    color: theme.bg,
                    fontSize: 18,
                },
                buttonPressedText: {
                    color: theme.accent1,
                },
                input: {
                    fontFamily: "BrandFont-Regular",
                    fontSize: 24,
                    padding: 15,
                    marginVertical: 10,
                    backgroundColor: theme.bgAlt,
                    outlineColor: theme.accent1,
                    color: theme.fg,
                },
            }),
        [theme]
    );
}
