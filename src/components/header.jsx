import { Image } from "react-native";
import { useStyles } from "../globalStyle";

import WorkClockWhiteLogo from "../../assets/workclock-white.png";

import ThemedView from "./styled/themedView";

import { useAuth } from "../authCtx";

import { LogoutButton } from "./logoutBtn";

import { StatusBar } from "react-native";

import ThemedButton from "./styled/themedButton";

import { useRouter, usePathname } from "expo-router";

import { Pressable } from "react-native";

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

            <Pressable onPress={() => router.back()}>
                <Image
                    source={WorkClockWhiteLogo}
                    style={[styles.logo, { marginRight: 10 }]}
                />
            </Pressable>

            {isAuthenticated && !isLoading && (
                <>
                    <ThemedButton
                        disabled={pathname === "/settings"}
                        onPress={() => router.push(`/(protected)/settings`)}
                    >
                        Settings
                    </ThemedButton>
                    <LogoutButton />
                </>
            )}
        </ThemedView>
    );
}
