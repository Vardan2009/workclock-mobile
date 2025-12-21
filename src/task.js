import React, { createContext, useContext, useState, useCallback } from "react";
import { getTasks } from "./api/protected";

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const loadTasks = useCallback(async () => {
        const data = await getTasks();

        const loadedTasks = data.tasks.map((t) => {
            const task = new Task(t.id, t.title, t.icon, t.task_note);

            task.taskInstances = t.task_instances.map(
                (inst) =>
                    new TaskInstance(
                        inst.taskId,
                        inst.est_duration_sec,
                        inst.real_duration_sec,
                        inst.timestamp_started,
                    ),
            );

            return task;
        });

        setTasks(loadedTasks);
    }, []);

    const value = {
        tasks,
        setTasks,
        loadTasks,
    };

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider");
    }

    return context;
}

export class TaskInstance {
    constructor(taskId, estDurationSec, realDurationSec, timestampStarted) {
        this.taskId = taskId;
        this.estDurationSec = estDurationSec;
        this.realDurationSec = realDurationSec;
        this.timestampStarted = timestampStarted;
    }

    getTimeBias() {
        return this.realDurationSec - this.estDurationSec;
    }
}

export class Task {
    constructor(id, title, icon, notes) {
        this.id = id;
        this.title = title;
        this.icon = icon || "📝";
        this.taskInstances = [];
        this.notes = notes;
        this.currentRunningInstance = undefined;
    }

    getAvgEstTime() {
        if (this.taskInstances.length === 0) return undefined;
        const totalEst = this.taskInstances.reduce(
            (sum, instance) => sum + instance.estDurationSec,
            0,
        );
        return totalEst / this.taskInstances.length;
    }

    getAvgRealTime() {
        if (this.taskInstances.length === 0) return undefined;
        const totalReal = this.taskInstances.reduce(
            (sum, instance) => sum + instance.realDurationSec,
            0,
        );
        return totalReal / this.taskInstances.length;
    }

    getAvgTimeBias() {
        if (this.taskInstances.length === 0) return undefined;
        const totalBias = this.taskInstances.reduce(
            (sum, instance) => sum + instance.getTimeBias(),
            0,
        );
        return totalBias / this.taskInstances.length;
    }

    getAvgTimeBiasPercentage() {
        const avgEst = this.getAvgEstTime();
        if (avgEst === undefined || avgEst === 0) return undefined;
        const avgBias = this.getAvgTimeBias();
        if (avgBias === undefined) return undefined;
        return (avgBias / avgEst) * 100;
    }

    startNewInstance(estDurationSec) {
        const newInstance = new TaskInstance(
            this.id,
            estDurationSec,
            0,
            Date.now(),
        );
        this.currentRunningInstance = newInstance;
    }

    getCurrentRunningInstanceElapsedTime() {
        if (this.currentRunningInstance) {
            const now = Date.now();
            const elapsedSec = Math.floor(
                (now - this.currentRunningInstance.timestampStarted) / 1000,
            );
            return elapsedSec;
        }
        return 0;
    }

    async stopCurrentInstance() {
        if (this.currentRunningInstance) {
            const now = Date.now();
            const elapsedSec = Math.floor(
                (now - this.currentRunningInstance.timestampStarted) / 1000,
            );
            this.currentRunningInstance.realDurationSec = elapsedSec;

            // Send to server
            await apiFetch(`/tasks/${this.id}/instances`, {
                method: "POST",
                body: JSON.stringify({
                    est_duration_sec:
                        this.currentRunningInstance.estDurationSec,
                    real_duration_sec: elapsedSec,
                    timestamp_started:
                        this.currentRunningInstance.timestampStarted,
                }),
            });

            this.taskInstances.push(this.currentRunningInstance);
            this.currentRunningInstance = undefined;
        }
    }
}
