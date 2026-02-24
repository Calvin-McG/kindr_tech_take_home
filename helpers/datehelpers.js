/* This function accepts a date,
parses it to the numeric UTC value,
and then returns it in the format YYYY-MM-DD */
exports.formatDate = function(date) {
    // Parse the date to the numeric UTC value
    const dateNumeric = Date.parse(date);

    // toISOString returns it in the format 1970-01-01T00:00:00.000Z
    const dateISO = new Date(dateNumeric).toISOString();

    // Strip out the 'T' and everything after it to get just YYYY-MM-DD
    const dateFormatted = dateISO.split("T")[0];

    // Return the formatted value
    return dateFormatted;
}
