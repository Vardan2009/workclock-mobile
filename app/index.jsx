import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.customText}>This is my custom font!</Text>
            <Text style={styles.boldText}>This is the bold version!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    customText: {
        fontFamily: "BrandFont-Regular",
        fontSize: 20,
    },
    boldText: {
        fontFamily: "BrandFont-Bold",
        fontSize: 20,
    },
});
