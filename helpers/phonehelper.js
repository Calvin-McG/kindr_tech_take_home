/* This function accepts a phone number in an arbitrary format and converts to to a pure numerical value
* for transmission to the legacy SOAP API */
exports.sanitizePhone = function(phone) {
    return sanitizePhone(phone);
}

/* This function accepts a phone number in an arbitrary format and converts it for display to the user
* in the format (123) 456-7890 */
exports.formatPhoneNumber = function(phone) {
    const sanitizedPhone = sanitizePhone(phone);

    const formattedPhone = "(" + sanitizedPhone.slice(0, 3) + ") " +
        sanitizedPhone.slice(3, 6) +
        "-" +
        sanitizedPhone.slice(6);

    return formattedPhone;
}

function sanitizePhone(phone) {
    return phone.replace(/\D/gm, '');
}
