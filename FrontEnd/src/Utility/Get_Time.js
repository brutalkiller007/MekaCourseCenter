export default function get_time(tot_sec){
    tot_sec = Math.floor(tot_sec);
    const x = convertToHoursMinutesAndSeconds(tot_sec);
    const y = formatDuration(x);

    return y;
}

const convertToHoursMinutesAndSeconds = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
};

const formatDuration = ({ hours, minutes, seconds }) => {
    const hoursStr = hours > 0 ? `${hours}h ` : '';
    const minutesStr = minutes > 0 ? `${minutes}m ` : '';
    const secondsStr = seconds > 0 ? `${seconds}s` : '';
    return `${hoursStr}${minutesStr}${secondsStr}`.trim();
};