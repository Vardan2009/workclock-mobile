import ThemedText from "../../src/components/styled/themedText";
import ThemedView from "../../src/components/styled/themedView";

import { useStyles } from "../../src/globalStyle";
import { useUserData } from "../../src/userDataCtx";

import LogoutButton from "../../src/components/logoutBtn";

import { Feather } from "@expo/vector-icons";

import { useTheme } from "../../src/themeCtx";

export default function YouPage() {
    const styles = useStyles();

    const { userData } = useUserData();

    const { theme } = useTheme();

    return (
        <ThemedView style={styles.page}>
            <ThemedView
                style={{ flexDirection: "row", gap: 10, marginBottom: 30 }}
            >
                <Feather style={{ color: theme.fg }} name="user" size={72} />
                {userData && (
                    <>
                        <ThemedText style={styles.title}>
                            {userData.username}
                        </ThemedText>
                    </>
                )}
            </ThemedView>
            <LogoutButton />
        </ThemedView>
    );
}
