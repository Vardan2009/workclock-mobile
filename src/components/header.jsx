import { Image } from "react-native";
import { useStyles } from "../globalStyle";

import WorkClockWhiteLogo from "../../assets/workclock-white.png";

import ThemedView from "./styled/themedView";

import { useAuth } from "../authCtx";

import { LogoutButton } from "./logoutBtn";

import { StatusBar } from "react-native";

export default function Header() {
    const styles = useStyles();

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

            <Image
                source={WorkClockWhiteLogo}
                style={[styles.logo, { marginRight: 10 }]}
            />
            {isAuthenticated && !isLoading && (
                <>
                    <LogoutButton />
                </>
            )}
        </ThemedView>
    );
}
