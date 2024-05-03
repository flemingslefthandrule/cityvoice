export function formatTimeDifference(postTime) {
    const currentTime = new Date();
    const postDate = new Date(postTime);
    const timeDifference = Math.abs(new Date(currentTime) - new Date(postDate));
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (secondsDifference < 60) {
        return `${secondsDifference} sec ago`;
    } else if (minutesDifference < 60) {
        return `${minutesDifference} min ago`;
    } else if (hoursDifference < 24) {
        return `${hoursDifference} hrs ago`;
    } else if (daysDifference < 7) {
        return `${daysDifference} days ago`;
    } else if(new Date(postDate).getFullYear() === new Date(currentTime).getFullYear()) {
        const options = { day: 'numeric', month: 'short' };
        return new Date(postDate).toLocaleDateString('en-IN', options);
    } else {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(postDate).toLocaleDateString('en-IN', options);
    }
}
