export function addCommas(number: number) {
    // Convert number to string
    let strNumber = number.toString();
    let length = strNumber.length;

    // Determine the position to start adding commas
    let start = length % 3 === 0 ? 3 : 1;
    let result = strNumber.substring(0, start);

    // Add commas after every three digits
    for (let i = start; i < length; i += 3) {
        result += ',' + strNumber.substring(i, i + 3);
    }

    return result;
}

// // Test cases
// console.log(addCommas(60000));      // Output: 60,000
// console.log(addCommas(60000000));   // Output: 6,00,00,000


export function formatNumber(number: number): string {

    if (!number) return '0';
    if (number < 1000) return String(number);

    // Define suffixes for thousands, millions, billions, etc.
    const suffixes: string[] = ['', 'K', 'M', 'B', 'T'];

    // Determine the appropriate suffix index
    const suffixIndex: number = Math.floor(Math.log10(number) / 3);

    // Calculate the formatted number
    let formattedNumber: number | string = number / Math.pow(1000, suffixIndex);

    // Round the number to 2 decimal places
    formattedNumber = Math.round(formattedNumber * 100) / 100;

    // Append the suffix to the formatted number
    return String(Math.floor(formattedNumber)) + suffixes[suffixIndex];;
}

// // Test cases
// console.log(formatNumber(1000));        // Output: 1K
// console.log(formatNumber(300000));      // Output: 300K
// console.log(formatNumber(452354024));    // Output: 40M
// console.log(formatNumber(40000000000)); // Output: 40B
