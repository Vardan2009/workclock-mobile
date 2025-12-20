import { useStyles } from "../../src/globalStyle";

import ThemeSelector from "../../src/components/themeSelector";

import ThemedView from "../../src/components/styled/themedView";
import ThemedText from "../../src/components/styled/themedText";

import TaskCard from "../../src/components/taskCard";

import { ScrollView } from "react-native";

export default function HomeScreen() {
    const styles = useStyles();

    return (
        <ThemedView style={styles.page}>
            <ThemedText style={styles.title}>Hello, username!</ThemedText>

            <ThemedText style={styles.subtitle}>Your tasks</ThemedText>

            <ScrollView>
                {[
                    {
                        title: "Task 1",
                        description: "Description for task 1",
                    },
                    {
                        title: "Task 2",
                        description: "Description for task 2",
                    },
                    {
                        title: "Task 3",
                        description: "Description for task 3",
                    },
                    {
                        title: "Task 4",
                        description: "Description for task 4",
                    },
                    {
                        title: "Task 5",
                        description: "Description for task 5",
                    },
                    {
                        title: "Task 6",
                        description: "Description for task 6",
                    },
                    {
                        title: "Task 7",
                        description: "Description for task 7",
                    },
                ].map((task, index) => (
                    <TaskCard key={index} task={task} />
                ))}
            </ScrollView>

            <ThemeSelector />
        </ThemedView>
    );
}
