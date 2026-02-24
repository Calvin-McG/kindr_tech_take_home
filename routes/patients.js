var express = require('express');
const {sanitizePhone, formatPhoneNumber} = require("../helpers/phonehelper");
const {formatDate} = require("../helpers/datehelpers");
var router = express.Router();

/* This route accepts a phone number in an arbitrary format and uses it to fetch patient information from the legacy endpoint */
router.get('/:phoneNumber', function(req, res, next) {
    // Parse the phone number from the params
    const rawPhoneNumber = req.params.phoneNumber;
    const phoneNumber = sanitizePhone(rawPhoneNumber)

    console.log(phoneNumber);

    const url = 'https://takehome-production.up.railway.app/soap/PatientService'
    const data = {
        phoneNumber: phoneNumber
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // *specify the content type*
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log(response)

        if (response.ok) {
            response.json().then(data => {
                console.log(data);

                if (data["soap:Envelope"] != undefined &&
                    data["soap:Envelope"]["soap:Body"] != undefined &&
                    data["soap:Envelope"]["soap:Body"].GetPatientResponse != undefined &&
                    data["soap:Envelope"]["soap:Body"].GetPatientResponse.Patient != undefined) {
                    console.log(data["soap:Envelope"]["soap:Body"].GetPatientResponse.Patient);
                    const rawPatient = data["soap:Envelope"]["soap:Body"].GetPatientResponse.Patient;
                    const patient = formatPatientResponse(rawPatient);
                    console.log(patient)
                }
            })
        }
        else {
            console.log(response.status, response.statusText);
        }
    })



    res.send('Incoming phone number: ' + phoneNumber);
});

/* This format accepts a patient from the legacy system, formats it for our use case, and returns the result */
function formatPatientResponse(patient) {
    // Format dates to YYYY-MM-DD
    formatPatientDates(patient);

    // Sanitize booleans
    sanitizePatientBooleans(patient);

    // Format phone numbers consistently.
    formatPatientPhoneNumbers(patient);

    return patient;
}

function formatPatientDates(patient) {
    if (patient.dob) {
        patient.dob = formatDate(patient.dob);
    }
    if (patient.lastVisit) {
        patient.lastVisit = formatDate(patient.lastVisit);
    }
}

function sanitizePatientBooleans(patient) {
    if (patient.insuranceActive) {
        patient.insuranceActive = convertToBoolean(patient.insuranceActive);
    }
}

function formatPatientPhoneNumbers(patient) {
    if (patient.phoneNumber) {
        patient.phoneNumber = formatPhoneNumber(patient.phoneNumber);
    }
}

function convertToBoolean(value) {
    // Convert values like y, yes, Y, YES, t, T, true, TRUE and so on to true
    if (value.charAt(0).toLowerCase() === "y" || value.charAt(0).toLowerCase() === "t") {
        return true;
    }
    // Convert values like n, no, N, NO, f, F, false, FALSE and so on to false
    if (value.charAt(0).toLowerCase() === "n" || value.charAt(0).toLowerCase() === "f") {
        return false;
    }
    // Some systems store bools numerically, this handles the true cases for such systems
    if (value > 0) {
        return true;
    }

    return false;
}

module.exports = router;
