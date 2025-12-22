export function formatSecondsToHMS(totalSeconds) {
    if (isNaN(totalSeconds)) return "N/A";

    const sign = totalSeconds < 0 ? "-" : "";
    totalSeconds = Math.abs(totalSeconds);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hoursStr = hours.toString().padStart(2, "0");
    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");

    return `${sign}${hoursStr}:${minutesStr}:${secondsStr}`;
}