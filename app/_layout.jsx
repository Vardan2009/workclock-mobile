import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import { ThemeProvider } from "../src/themeCtx";

import { View } from "react-native";

import ThemedView from "../src/components/styled/themedView";

import Header from "../src/components/header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "BrandFont-Regular": require("../assets/fonts/FunnelDisplay-Regular.ttf"),
        "BrandFont-Bold": require("../assets/fonts/FunnelDisplay-Bold.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <ThemedView style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 15 }}>
                    <Header />
                    <Slot />
                </View>
            </ThemedView>
        </ThemeProvider>
    );
}
