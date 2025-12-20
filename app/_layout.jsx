import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import { ThemeProvider } from "../src/themeCtx";

import { AuthProvider } from "../src/authCtx";

import Header from "../src/components/header";

import { SafeAreaProvider } from "react-native-safe-area-context";

import ThemedSafeView from "../src/components/styled/themedSafeView";

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
        <AuthProvider>
            <SafeAreaProvider>
                <ThemeProvider>
                    <ThemedSafeView style={{ flex: 1, padding: 15 }}>
                        <Header />
                        <Slot />
                    </ThemedSafeView>
                </ThemeProvider>
            </SafeAreaProvider>
        </AuthProvider>
    );
}
