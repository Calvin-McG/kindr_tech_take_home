var express = require('express');
const {sanitizePhone, formatPhoneNumber} = require("../helpers/phonehelper");
const {formatDate} = require("../helpers/datehelpers");
var router = express.Router();

/* This route accepts a phone number in an arbitrary format and uses it to fetch patient information from the legacy endpoint */
router.get('/:phoneNumber', function(req, res, next) {
    // Parse the phone number from the params
    const rawPhoneNumber = req.params.phoneNumber;

    // Sanitize the phone number for transmission to legacy system
    const phoneNumber = sanitizePhone(rawPhoneNumber)

    const url = 'https://takehome-production.up.railway.app/soap/PatientService'

    const data = {
        phoneNumber: phoneNumber
    };

    // Make the request to the legacy system
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        // Ensure we received a patient.
        if (response.ok) {
            response.json().then(data => {
                // Ensure the patient exists with the expected structure
                if (data["soap:Envelope"] != undefined &&
                    data["soap:Envelope"]["soap:Body"] != undefined &&
                    data["soap:Envelope"]["soap:Body"].GetPatientResponse != undefined &&
                    data["soap:Envelope"]["soap:Body"].GetPatientResponse.Patient != undefined) {

                    // Reference the raw patient
                    const rawPatient = data["soap:Envelope"]["soap:Body"].GetPatientResponse.Patient;

                    // Run through the methods to reformat the patient for our needs
                    const patient = formatPatientResponse(rawPatient);

                    // Send the reformatted patient
                    res.set('Content-Type', 'application/json');
                    res.send(JSON.stringify(patient));
                }
                // In cases it doesn't have the patient
                else {
                    // Build an error response
                    const errorResponse = {
                        status: 404,
                        statusText: "Patient not found"
                    }

                    // Reflect it to the user.
                    res.set('Content-Type', 'application/json');
                    res.send(JSON.stringify(errorResponse));
                }
            })
        }
        else {
            // Build an error response with the results from the legacy endpoint
            const errorResponse = {
                status: response.status,
                statusText: response.statusText
            }

            // Pass it along to the user.
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(errorResponse));
        }
    })

});

/* This format accepts a patient from the legacy system, formats it for our use case, and returns the result */
function formatPatientResponse(patient) {
    // Format dates to YYYY-MM-DD
    formatPatientDates(patient);

    // Sanitize booleans
    sanitizePatientBooleans(patient);

    // Format phone numbers consistently.
    formatPatientPhoneNumbers(patient);

    // Format the patient's variables to the desired format
    formatPatientVariables(patient);

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

function formatPatientVariables(patient) {
    if (patient.patientId) {
        patient.patient_id = patient.patientId
        delete patient.patientId;
    }

    if (patient.insuranceActive) {
        patient.has_active_insurance = patient.insuranceActive;
        delete patient.insuranceActive;
    }

    if (patient.firstName) {
        patient.first_name = patient.firstName
        delete patient.firstName;
    }

    if (patient.lastName) {
        patient.last_name = patient.lastName
        delete patient.lastName;
    }

    if (patient.phoneNumber) {
        patient.phone = patient.phoneNumber
        delete patient.phoneNumber;
    }

    if (patient.dob) {
        patient.date_of_birth = patient.dob;
        delete patient.dob;
    }

    if (patient.lastVisit) {
        patient.last_visit_date = patient.lastVisit;
        delete patient.lastVisit;
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
