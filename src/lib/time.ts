export function getElapsedTime(updatedAt: string) {
    const currentDate: any = new Date();
    const updatedDate: any = new Date(updatedAt);

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - updatedDate;

    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Determine the appropriate time unit to display
    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''}`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''}`;
    }
}

export function formatDate2(date: Date): string {
    // const date = new Date(inputDate);
    const options : any = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}


export function formatDate(date: Date): string {
    // Define options for formatting the date
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };

    // Format the date
    const formattedDate: string = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

// // Test
// const myDate = new Date(2022, 10, 25); // November 25, 2022
// console.log(formatDate2(myDate)); // Output: Nov 25, 2022
