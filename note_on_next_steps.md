The EXPLORATION.md document has timestamps marking my progress as I went along, but broadly speaking:
25 min - Setting up repo and ensuring python was configured correctly for tests to run
40 min - Determining how to query the endpoint to fetch patients by phone number
40 min - Trialing xml and SOAP parsing libraries, resolving finally to use it as raw xml
45 min - Endpoint 1 working on the happy path
20 min - Investigating test failures and working to cover non-happy path cases for endpoint 1
10 min - Cleaning up and commenting code, wrapping up.

These are my desired tasks, in order, if I had more time:

1. The tests cases seemed to return inconsistent results, and there seemed to be issues with how it was attempting to access variables in the response object. Initially I thought this was due to the test using different sample patients with different sample formats. However test_phone_format_handling was consistently using variations on 5551234567 as the phone number, which is the phone number I was using when debugging, and I could see it returning correctly on the patient. The patient also consistently had the patient_id variable with the correct value. Despite this the test kept failing with KeyError: patient_id, noting this section: response.json()['patient_id']. Given more time the first step would be to update my code to better match the format given in the test file as I believe the these two would pass with only minor tweaks to how I format the response: test_patient_not_found & test_phone_format_handling.
2. I intended to finish the first of three endpoints before moving to Part 2, the system design document. This would give a good sample of both code and system design, and would give me a good foundation for moving on to endpoints two and three as much of the initial structure and many of the helper functions would already be in place.
3. Following that, I would return to finishing the endpoints, starting with 2 as it could lean on functionality created for endpoint 1, more than endpoint 3 would be able to.

Additional Edge Cases:
1. The existing batch of dates returned by the PatientService included no time zone and no hour information. This is desirable and keeps things simple. However if some patients in the legacy system did have such information attached to their dates it would be possible to get off-by-one errors as the conversion into Zulu time caused the day to shift by one. 
2. International phone numbers can have numbers of digits other than ten, and some systems require the country code even in cases where all the users are in the US and Canada. I recall country code being quite the headache at WestJet and it's the next edge case I would look to cover.
