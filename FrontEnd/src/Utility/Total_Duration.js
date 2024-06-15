
export default function get_total_duration(course_content){

    const total_duration = course_content?.reduce((acc, section) => {
        const sectionDuration = section.sub_section?.reduce((ac, sub_section) => ac + (sub_section.duration || 0), 0) || 0;
        return acc + sectionDuration;
    }, 0) || 0;
    
    const x = convertToHoursMinutesAndSeconds(Math.floor(total_duration));
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
    const hoursStr = hours > 0 ? `${hours}hr ` : '';
    const minutesStr = minutes > 0 ? `${minutes}mins ` : '';
    const secondsStr = seconds > 0 ? `${seconds}secs` : '';
    return `${hoursStr}${minutesStr}${secondsStr}`.trim();
};