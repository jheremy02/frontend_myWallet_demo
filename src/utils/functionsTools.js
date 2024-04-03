export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  export function formatFullDateTime(inputDateString) {
    
    // Convert the input string to a Date object
    var dateObject = new Date(inputDateString);

    // Extract the year, month, and day components
    var year = dateObject.getFullYear();
    var month = ('0' + (dateObject.getMonth() + 1)).slice(-2);  // Months are 0-indexed, so we add 1
    var day = ('0' + dateObject.getDate()).slice(-2);

    // Format the date in 'yyyy-mm-dd' format
    var formattedDate = year + '-' + month + '-' + day;

    return formattedDate;
}

export function combineAndSortDates(array1, array2) {
  // Combine arrays and remove duplicates
  let combinedArray = Array.from(new Set([...array1, ...array2]));

  // Convert strings to Date objects for sorting
  let dateObjects = combinedArray.map(dateStr => new Date(dateStr));

  // Sort Date objects
  dateObjects.sort((a, b) => a - b);

  // Convert back to strings in 'yyyy-mm-dd' format
  let sortedDateStrings = dateObjects.map(date => date.toISOString().split('T')[0]);

  return sortedDateStrings;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}