import ThemedButton from "../../src/components/styled/themedButton";
import ThemedText from "../../src/components/styled/themedText";

import ThemedView from "../../src/components/styled/themedView";

import { useStyles } from "../../src/globalStyle";
import { useTheme } from "../../src/themeCtx";

import ThemedInput from "../../src/components/styled/themedInput";

import { router } from "expo-router";

import { useState } from "react";
import { api } from "../../src/api/client";

import { Feather } from "@expo/vector-icons";

export default function NewTaskPage() {
    const styles = useStyles();
    const { theme } = useTheme();

    const allTaskIcons = [
        "📝",
        "📚",
        "🛠️",
        "💼",
        "🎨",
        "🎵",
        "🏃‍♂️",
        "🍳",
        "🧹",
        "🚀",
    ];

    const [selectedIcon, setSelectedIcon] = useState(0);

    const [taskTitle, setTaskTitle] = useState("");

    const [creating, setCreating] = useState(false);

    const handleNew = async () => {
        setCreating(true);
        await api.post(`/tasks`, {
            title: taskTitle,
            icon: allTaskIcons[selectedIcon],
        });
        router.back();
    };

    return (
        <ThemedView style={styles.page}>
            <ThemedText style={styles.title}>Create new Task</ThemedText>
            <ThemedText style={styles.subtitle}>Task Title</ThemedText>
            <ThemedInput
                editable={!creating}
                value={taskTitle}
                onChangeText={setTaskTitle}
            />
            <ThemedText style={styles.subtitle}>Task Icon</ThemedText>
            <ThemedView
                style={{
                    width: "100%",
                    flexDirection: "row",
                    gap: 5,
                    marginVertical: 20,
                    flexWrap: "wrap",
                }}
            >
                {allTaskIcons.map((t, i) => (
                    <ThemedButton
                        onPress={() => {
                            setSelectedIcon(i);
                        }}
                        disabled={creating}
                        style={[
                            {
                                width: 50,
                                aspectRatio: 1,
                                margin: 1,
                            },
                            selectedIcon != i && {
                                backgroundColor: theme.bgAlt,
                                outlineColor: theme.accent1,
                                outlineWidth: 1,
                            },
                        ]}
                        key={i}
                    >
                        {t}
                    </ThemedButton>
                ))}
            </ThemedView>
            <ThemedView
                style={{
                    flexDirection: "row",
                }}
            >
                <ThemedButton
                    style={styles.buttonOutline}
                    disabled={creating}
                    textStyle={styles.buttonOutlineText}
                    onPress={() => router.back()}
                >
                    <Feather name="arrow-left" size={16} /> Back
                </ThemedButton>
                <ThemedButton
                    onPress={handleNew}
                    disabled={creating}
                    style={{ flex: 1, margin: 5 }}
                >
                    <Feather name="plus" size={16} /> Create
                </ThemedButton>
            </ThemedView>
        </ThemedView>
    );
}
