import ThemedText from "../../../src/components/styled/themedText";
import ThemedView from "../../../src/components/styled/themedView";
import ThemedButton from "../../../src/components/styled/themedButton";
import ThemedInput from "../../../src/components/styled/themedInput";

import { useStyles } from "../../../src/globalStyle";

import { useLocalSearchParams } from "expo-router";

import { useTasks } from "../../../src/task";

import { formatSecondsToHMS } from "../../../src/util";

import { router } from "expo-router";

import { ScrollView } from "react-native";

import { useEffect, useState, useRef } from "react";

import { useTheme } from "../../../src/themeCtx";

import { Feather } from "@expo/vector-icons";
import { api } from "../../../src/api/client";

export default function TaskDetail() {
    const styles = useStyles();

    const params = useLocalSearchParams();

    const [unsaved, setUnsaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const debounceTimeout = useRef(null);

    const { tasks } = useTasks();
    const { theme } = useTheme();

    const task = tasks.find((t) => t.id == params.id);

    const [notes, setNotes] = useState(task.notes);

    const saveNotes = (t) => {
        setNotes(t);
        setUnsaved(true);
        setSaving(false);

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(async () => {
            setSaving(true);
            await api.patch(`/tasks/${task.id}/note`, { note: t });
            setUnsaved(false);
            setSaving(false);
        }, 300);
    };

    return (
        <ScrollView style={styles.page}>
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

            <ThemedText style={[styles.subtitle, { marginTop: 30 }]}>
                Task Notes{" "}
                {unsaved && (
                    <ThemedText style={{ color: theme.danger }}>*</ThemedText>
                )}{" "}
                {saving && (
                    <ThemedText style={{ marginLeft: 10 }}>
                        Saving...
                    </ThemedText>
                )}
            </ThemedText>

            <ThemedInput
                value={notes}
                onChangeText={saveNotes}
                multiline={true}
                placeholder="Your notes here..."
                style={{ height: 300, padding: 10, fontSize: 16 }}
            />

            <ThemedText style={[styles.subtitle, { marginTop: 30 }]}>
                Task Instances
            </ThemedText>

            <ScrollView style={{ height: 500 }}>
                {task.taskInstances.toReversed().map((inst, i) => (
                    <ThemedView
                        key={i}
                        style={{
                            marginVertical: 10,
                            backgroundColor: theme.bgAlt,
                            padding: 5,
                            borderRadius: 5,
                        }}
                    >
                        <ThemedText
                            style={{
                                fontFamily: "BrandFont-Bold",
                                color: theme.accent1,
                            }}
                        >
                            --- Instance {task.taskInstances.length - i}
                        </ThemedText>

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
                <Feather style name="arrow-left" size={16} /> Back
            </ThemedButton>
        </ScrollView>
    );
}
