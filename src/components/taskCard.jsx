import ThemedText from "./styled/themedText";
import ThemedView from "./styled/themedView";

import ThemedButton from "./styled/themedButton";

import { useStyles } from "../globalStyle";

import { useTheme } from "../themeCtx";
import { api } from "../api/client";

import { useTasks } from "../task";
import { useEffect, useState } from "react";

import { useRef } from "react";

import { router } from "expo-router";

import { Pressable } from "react-native";

import { formatSecondsToHMS } from "../util";

export default function TaskCard({ task }) {
    const styles = useStyles();
    const { theme } = useTheme();

    const { loadTasks } = useTasks();

    const [beingDeleted, setBeingDeleted] = useState(false);

    const [running, setRunning] = useState(null);

    const [runningEstDuration, setRunningEstDuration] = useState(0);
    const [runningElapsedTime, setRunningElapsedTime] = useState(0);

    const intervalRef = useRef(null);

    const handleDelete = async () => {
        setBeingDeleted(true);
        await api.delete(`/tasks/${task.id}`);
        await loadTasks();
    };

    useEffect(() => {
        const checkRunningInstance = async () => {
            const data = (await api.get(`/tasks/${task.id}/instances/elapsed`))
                .data;
            setRunning(data.error == null);
            if (data.error == null) {
                setRunningEstDuration(data.est_duration_sec);
                setRunningElapsedTime(data.elapsed_sec);
                startTimer();
            }
        };

        checkRunningInstance();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startNewInstance = async () => {
        const estTime = 10;

        if (!isNaN(estTime) && estTime > 0) {
            await api.post(`/tasks/${task.id}/instances/start`, {
                est_duration_sec: estTime,
            });
            setRunning(true);
            setRunningEstDuration(estTime);
            setRunningElapsedTime(0);
            startTimer();
        }
    };

    const stopInstance = async () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        await api.post(`/tasks/${task.id}/instances/stop`);
        setRunning(false);
        setRunningEstDuration(0);
        setRunningElapsedTime(0);
        await loadTasks();
    };

    const startTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setRunningElapsedTime((p) => p + 1);
        }, 1000);
    };

    return (
        <ThemedView
            style={{
                flexDirection: "column",
                justifyContent: "center",
                padding: 16,
                marginTop: 8,
                borderRadius: 5,
                backgroundColor: theme.bgAlt,
                opacity: beingDeleted ? 0.5 : 1,
            }}
        >
            <ThemedView
                style={{
                    backgroundColor: theme.bgAlt,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Pressable
                    onPress={() => router.push(`/(protected)/task/${task.id}`)}
                >
                    <ThemedText style={styles.subtitle}>
                        {task.icon} {task.title}
                    </ThemedText>
                </Pressable>
                <ThemedButton
                    onPress={handleDelete}
                    disabled={beingDeleted}
                    style={{ backgroundColor: theme.danger }}
                >
                    Delete
                </ThemedButton>
            </ThemedView>

            {!running && (
                <>
                    <ThemedText>
                        Avg. estimate {formatSecondsToHMS(task.getAvgEstTime())}
                    </ThemedText>
                    <ThemedText>
                        Avg. actual {formatSecondsToHMS(task.getAvgRealTime())}
                    </ThemedText>
                    <ThemedText>
                        Avg. bias {formatSecondsToHMS(task.getAvgTimeBias())} (
                        {task.getAvgTimeBiasPercentage()?.toFixed(1)}%)
                    </ThemedText>

                    <ThemedButton
                        onPress={startNewInstance}
                        disabled={beingDeleted}
                    >
                        Start Tracking
                    </ThemedButton>
                </>
            )}
            {running && (
                <>
                    <ThemedText>Running...</ThemedText>

                    <ThemedText>
                        Estimated: {formatSecondsToHMS(runningEstDuration)}
                    </ThemedText>
                    <ThemedText>
                        Elapsed {formatSecondsToHMS(runningElapsedTime)}
                    </ThemedText>

                    <ThemedButton
                        onPress={stopInstance}
                        disabled={beingDeleted}
                    >
                        Complete Task
                    </ThemedButton>
                </>
            )}
        </ThemedView>
    );
}
