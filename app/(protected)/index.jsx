import { useStyles } from "../../src/globalStyle";

import ThemedView from "../../src/components/styled/themedView";
import ThemedText from "../../src/components/styled/themedText";

import ThemedButton from "../../src/components/styled/themedButton";
import TimeSelectModal from "../../src/components/timeSelectModal";

import TaskCard from "../../src/components/taskCard";

import { ScrollView } from "react-native";

import { getUser } from "../../src/api/protected";

import { useTasks } from "../../src/task";

import { useState, useCallback } from "react";

import { router } from "expo-router";

import { useFocusEffect } from "expo-router";

import { Feather } from "@expo/vector-icons";

import { usePromptDuration } from "../../src/components/promptDuration";

export default function HomeScreen() {
    const styles = useStyles();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const { tasks, loadTasks } = useTasks();

    const { promptDuration, modal } = usePromptDuration();

    useFocusEffect(
        useCallback(() => {
            const fetchUserData = async () => {
                const u = await getUser();

                if (u.error) setError(u.error);

                setUser(u);
            };

            fetchUserData();
            loadTasks();
        }, [])
    );

    return (
        <ThemedView style={styles.page}>
            {user && tasks && (
                <>
                    <ThemedText style={styles.title}>
                        Hello, {user.username}!
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>Your tasks</ThemedText>
                    <ThemedButton
                        onPress={() => {
                            router.push(`/(protected)/newTask`);
                        }}
                    >
                        <Feather name="plus" size={16} /> New Task
                    </ThemedButton>
                    <ScrollView>
                        {tasks.map((task) => (
                            <TaskCard
                                promptDuration={promptDuration}
                                key={task.id}
                                task={task}
                            />
                        ))}
                    </ScrollView>
                </>
            )}

            {!(user && tasks) && <ThemedText>Please wait...</ThemedText>}
            {error && <ThemedText>An error occured: {error}</ThemedText>}
            {modal}
        </ThemedView>
    );
}
