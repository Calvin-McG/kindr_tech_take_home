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

Key decisions & Rationale:

XML Parsing
Originally I was trying to use either an XML parser or full SOAP client to read from the legacy system. However after trialing at least three libraries, none could reliably read the xml provided by the SOAP response. I set this aside, the experience reinforcing my desire to keep matters as simple as possible. Instead I parsed the XML with a simple .json(). This is not necessarily the specified way to read SOAP with Express, however it gives consistent and simple results, which none of the available libraries could provide. In lieu of such a library, I used raw js to check the structure matched the expectations, and extracted the patient for further processing.

Phone Parsing
    As the legacy endpoint would consistently accept a pure number for phone number input, and it's the simplest way of writing a phone number, this is what was used when passing the phone number around from a technical perspective.
    For user display, the (123) 456-7890 format is much more readable. The incoming phone number would be formatted to 1234567890, this way the formatter would have a consistent input to work from, simplifying the step of reformatting to (123) 456-7890
    A phone parsing library was not used to reduce both overhead, and time lost to selecting and debugging the library. (As was the case with XML parsing below)

Date Parsing
    Dates are notoriously tricky to deal with, so I used the most basic js Date() objects to parse the incoming date into the numeric UTC to give a consistient starting point. From there the built in ISO format starts with the desired YYYY-MM-DD, so I used it and discarded the extra time related characters.
