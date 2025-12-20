import { Image } from "react-native";
import { useStyles } from "../globalStyle";

import WorkClockWhiteLogo from "../../assets/workclock-white.png";

import ThemedView from "./styled/themedView";

export default function Header() {
    const styles = useStyles();

    return (
        <ThemedView>
            <Image source={WorkClockWhiteLogo} style={styles.logo} />
        </ThemedView>
    );
}
