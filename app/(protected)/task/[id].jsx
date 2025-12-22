import ThemedText from "../../../src/components/styled/themedText";
import ThemedView from "../../../src/components/styled/themedView";
import ThemedButton from "../../../src/components/styled/themedButton";

import { useStyles } from "../../../src/globalStyle";

import { useLocalSearchParams } from "expo-router";

import { useTasks } from "../../../src/task";

import { formatSecondsToHMS } from "../../../src/util";

import { router } from "expo-router";

import { ScrollView } from "react-native";

export default function TaskDetail() {
    const styles = useStyles();

    const params = useLocalSearchParams();

    const { tasks } = useTasks();

    const task = tasks.find((t) => t.id == params.id);

    return (
        <ThemedView style={styles.page}>
            <ThemedText style={styles.title}>
                {task.icon} {task.title}
            </ThemedText>

            <ThemedText>
                Avg. estimate: {formatSecondsToHMS(task.getAvgEstTime())}
            </ThemedText>
            <ThemedText>
                Avg. actual: {formatSecondsToHMS(task.getAvgRealTime())}
            </ThemedText>
            <ThemedText>
                Avg. bias: {formatSecondsToHMS(task.getAvgTimeBias())} (
                {task.getAvgTimeBiasPercentage()?.toFixed(1)}%)
            </ThemedText>

            <ThemedText>
                Total instances: {task.taskInstances.length}
            </ThemedText>

            <ThemedText style={[styles.subtitle, { marginVertical: 30 }]}>
                Task Instances
            </ThemedText>

            <ScrollView>
                {task.taskInstances.map((inst, i) => (
                    <ThemedView key={i} style={{ marginVertical: 10 }}>
                        <ThemedText>--- Instance {i + 1}</ThemedText>

                        <ThemedText style={{ marginLeft: 30 }}>
                            Started{" "}
                            {new Date(inst.timestampStarted).toLocaleString()}
                        </ThemedText>

                        <ThemedText style={{ marginLeft: 30 }}>
                            Estimated: {formatSecondsToHMS(inst.estDurationSec)}
                        </ThemedText>

                        <ThemedText style={{ marginLeft: 30 }}>
                            Actual: {formatSecondsToHMS(inst.realDurationSec)}
                        </ThemedText>

                        <ThemedText style={{ marginLeft: 30 }}>
                            Bias: {formatSecondsToHMS(inst.getTimeBias())} (
                            {(
                                (inst.getTimeBias() / inst.estDurationSec) *
                                100
                            ).toFixed(1)}
                            %)
                        </ThemedText>
                    </ThemedView>
                ))}
            </ScrollView>

            <ThemedButton
                style={{ marginTop: 30 }}
                onPress={() => router.back()}
            >
                &lt; Back
            </ThemedButton>
        </ThemedView>
    );
}
