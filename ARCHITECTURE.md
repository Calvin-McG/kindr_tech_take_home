The wrapper is designed to be as simple as possible to avoid errors caused by the necessary reformatting.

It runs with the following steps:
1. It accepts the response from the legacy SOAP endpoint
2. It parses out the necessary object from the SOAP envelope and body
3. Referencing this raw object response, it steps through each neccesary reformatting:
   a. It corrects any known dates to YYYY-MM-DD
   b. It corrects any variables that should be booleans by parsing likely alternative formats to proper bools
   c. It formats any know phone numbers to (123) 456-7890
   d. Finally, it runs through the object checking for variables named differently than expected and renames them.

This general process would be followed for endpoints 2 and 3 if possible, using the helper functions built for endpoint 1.
