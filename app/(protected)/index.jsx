import { useStyles } from "../../src/globalStyle";

import ThemedView from "../../src/components/styled/themedView";
import ThemedText from "../../src/components/styled/themedText";

import ThemedButton from "../../src/components/styled/themedButton";

import TaskCard from "../../src/components/taskCard";

import { ScrollView } from "react-native";

import { getUser } from "../../src/api/protected";

import { useTasks } from "../../src/task";

import { useState } from "react";

import { router } from "expo-router";

import { useFocusEffect } from "expo-router";

import { useCallback } from "react";

import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
    const styles = useStyles();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const { tasks, loadTasks } = useTasks();

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

    // useEffect(() => {
    //     fetchUserData();
    //     loadTasks();
    // }, []);

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
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </ScrollView>
                </>
            )}
            {!(user && tasks) && <ThemedText>Please wait...</ThemedText>}
            {error && <ThemedText>An error occured: {error}</ThemedText>}
        </ThemedView>
    );
}
