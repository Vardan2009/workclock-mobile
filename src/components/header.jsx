import { Image } from "react-native";
import { useStyles } from "../globalStyle";

import WorkClockWhiteLogo from "../../assets/workclock-white.png";

import ThemedPressable from "./styled/themedPressable";

import ThemedView from "./styled/themedView";

import { useAuth } from "../authCtx";

import { StatusBar } from "react-native";

import ThemedButton from "./styled/themedButton";

import { useRouter, usePathname } from "expo-router";

import { Feather } from "@expo/vector-icons";

export default function Header() {
    const styles = useStyles();

    const router = useRouter();
    const pathname = usePathname();

    const { isAuthenticated, isLoading } = useAuth();

    return (
        <ThemedView
            style={{
                marginBottom: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <StatusBar barStyle={useStyles().barStyle} />

            <ThemedPressable
                onPress={() => {
                    router.dismissTo(`/`);
                }}
            >
                <Image
                    source={WorkClockWhiteLogo}
                    style={[styles.logo, { marginRight: 10 }]}
                />
            </ThemedPressable>

            {isAuthenticated && !isLoading && (
                <ThemedView
                    style={{
                        flexDirection: "row",
                        gap: 10,
                    }}
                >
                    <ThemedButton
                        disabled={pathname === "/you"}
                        onPress={() => router.push(`/(protected)/you`)}
                    >
                        <Feather name="user" size={16} onPress={() => {}} />
                        {" You"}
                    </ThemedButton>
                    <ThemedButton
                        disabled={pathname === "/settings"}
                        onPress={() => router.push(`/(protected)/settings`)}
                    >
                        <Feather name="settings" size={16} onPress={() => {}} />
                        {" Settings"}
                    </ThemedButton>
                </ThemedView>
            )}
        </ThemedView>
    );
}
