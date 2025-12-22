import { Modal, View } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

import ThemedInput from "./styled/themedInput";
import ThemedText from "./styled/themedText";
import ThemedButton from "./styled/themedButton";
import ThemedView from "./styled/themedView";
import { useTheme } from "../themeCtx";

import { useEffect } from "react";

export default function TimeSelectModal({
    visible,
    setVisible,
    onAccept,
    onCancel,
}) {
    const { theme } = useTheme();

    const [hh, setHh] = useState("");
    const [mm, setMm] = useState("");
    const [ss, setSs] = useState("");

    const toSeconds = () => {
        const h = parseInt(hh || "0", 10);
        const m = parseInt(mm || "0", 10);
        const s = parseInt(ss || "0", 10);
        return h * 3600 + m * 60 + s;
    };

    useEffect(() => {
        if (visible) {
            setHh("");
            setMm("");
            setSs("");
        }
    }, [visible]);

    const handleAccept = () => {
        const totalSeconds = toSeconds();
        setVisible(false);
        onAccept(totalSeconds);
    };

    const numberOnly = (setter) => (text) =>
        setter(text.replace(/[^0-9]/g, ""));

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}
            transparent={false}
        >
            <ThemedView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 30,
                }}
            >
                <ThemedText style={{ fontSize: 20, marginBottom: 20 }}>
                    Estimate task duration
                </ThemedText>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 30,
                    }}
                >
                    {[
                        { label: "hh", value: hh, setter: setHh },
                        { label: "mm", value: mm, setter: setMm },
                        { label: "ss", value: ss, setter: setSs },
                    ].map(({ label, value, setter }) => (
                        <View key={label} style={{ alignItems: "center" }}>
                            <ThemedInput
                                value={value}
                                onChangeText={numberOnly(setter)}
                                keyboardType="number-pad"
                                maxLength={2}
                                placeholder="00"
                                style={{
                                    width: 70,
                                    padding: 10,
                                    textAlign: "center",
                                    borderWidth: 1,
                                    borderColor: theme.bgAlt,
                                    borderRadius: 8,
                                    color: theme.fg,
                                    fontSize: 36,
                                }}
                            />
                            <ThemedText style={{ marginTop: 5 }}>
                                {label}
                            </ThemedText>
                        </View>
                    ))}
                </View>

                <ThemedButton onPress={handleAccept}>
                    <Feather name="check" size={16} /> Confirm
                </ThemedButton>

                <ThemedButton
                    onPress={() => {
                        setVisible(false);
                        onCancel();
                    }}
                    style={{ backgroundColor: theme.danger, marginTop: 10 }}
                >
                    <Feather name="x" size={16} /> Cancel
                </ThemedButton>
            </ThemedView>
        </Modal>
    );
}
