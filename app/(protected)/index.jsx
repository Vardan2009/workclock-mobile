import { useStyles } from "../../src/globalStyle";

import ThemedView from "../../src/components/styled/themedView";
import ThemedText from "../../src/components/styled/themedText";

import ThemedButton from "../../src/components/styled/themedButton";
import TimeSelectModal from "../../src/components/timeSelectModal";

import TaskCard from "../../src/components/taskCard";

import { ScrollView } from "react-native";

import { useUserData } from "../../src/userDataCtx";

import { useTasks } from "../../src/task";

import { useCallback } from "react";

import { router } from "expo-router";

import { useFocusEffect } from "expo-router";

import { Feather } from "@expo/vector-icons";

import { usePromptDuration } from "../../src/components/promptDuration";

export default function HomeScreen() {
    const styles = useStyles();

    const { userData, loadUserData } = useUserData();
    const { tasks, loadTasks } = useTasks();

    const { promptDuration, modal } = usePromptDuration();

    useFocusEffect(
        useCallback(() => {
            loadTasks();
            loadUserData();
        }, [])
    );

    return (
        <ThemedView style={styles.page}>
            {userData && tasks && (
                <>
                    <ThemedText style={styles.title}>
                        Hello, {userData.username}!
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

            {!(userData && tasks) && <ThemedText>Please wait...</ThemedText>}
            {modal}
        </ThemedView>
    );
}
