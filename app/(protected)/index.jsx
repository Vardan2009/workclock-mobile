import { useStyles } from "../../src/globalStyle";

import ThemeSelector from "../../src/components/themeSelector";

import ThemedView from "../../src/components/styled/themedView";
import ThemedText from "../../src/components/styled/themedText";

import TaskCard from "../../src/components/taskCard";

import { ScrollView } from "react-native";

import { getUser } from "../../src/api/protected";

import { useTasks } from "../../src/task";

import { useEffect, useState } from "react";

export default function HomeScreen() {
    const styles = useStyles();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const u = await getUser();

            if (u.error) setError(u.error);

            setUser(u);
        };
        fetchData();
    }, []);

    const { tasks, loadTasks } = useTasks();

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <>
            {user && tasks && (
                <ThemedView style={styles.page}>
                    <ThemedText style={styles.title}>
                        Hello, {user.username}!
                    </ThemedText>

                    <ThemedText style={styles.subtitle}>Your tasks</ThemedText>

                    <ScrollView>
                        {tasks.map((task, index) => (
                            <TaskCard key={index} task={task} />
                        ))}
                    </ScrollView>

                    <ThemeSelector />
                </ThemedView>
            )}
            {!(user && tasks) && <ThemedText>Please wait...</ThemedText>}
            {error && <ThemedText>An error occured: {error}</ThemedText>}
        </>
    );
}
