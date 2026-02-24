10:2X   -   Pushed base express project to repo, misc config steps
10:26   -   Got test_requirements.py running for the first time, takes ~90s
Went to https://takehome-production.up.railway.app and saw the following, showing me the endpoints:
{
  "endpoints": [
    "/health - Health check",
    "/soap/PatientService - Get patient information",
    "/soap/AppointmentService/GetAvailability - Get available slots",
    "/soap/AppointmentService/BookAppointment - Book an appointment"
  ],
  "note": "This is a legacy system simulator with intentional delays and quirks",
  "service": "DentalTrack Pro SOAP API Simulator",
  "status": "operational",
  "version": "2.1"
}

Draft of phone endpoint, tried to nav to https://takehome-production.up.railway.app/soap/PatientService and got a 405 :(
GET also returns 405, body shows it allows POST and OPTIONS, POST with blank body gave a Bad Request response, progress!
Tried to access WSDL for SOAP endpoint via https://takehome-production.up.railway.app/soap/PatientService?wsdl, https://takehome-production.up.railway.app/soap?wsdl, https://takehome-production.up.railway.app?wsdl

10:49   -   New strategy, POST to https://takehome-production.up.railway.app/soap/PatientService with the following:
    {
        phoneNumber: 1,
        phone_number: 1,
        phonenumber: 1
    }
Gave 404, meaning it doesn't have someone with that phone number (obviously), but one of those variables is the valid format.

10:52   -    After running three requests, each with a different version of the above, phone_number got the 404 while the others got 400.

Referenced test file to try http://localhost:3000/api/v1/patients/5551234567

GET /api/v1/patients/5551234567 304 22.415 ms - -
Response {
  status: 400,
  statusText: 'Bad Request',
  headers: Headers {
    'content-length': '167',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:04:02 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'oaxmYfnPTnafsDGB0_TJvA'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: false,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}

11:06   -   Might have misread the logs, retrying one by one:

GET /api/v1/patients/5551234567 304 23.281 ms - -
0
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-length': '360',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:07:10 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'w-g54MSjR7WbnFfn9I3ezw'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
2
Response {
  status: 400,
  statusText: 'Bad Request',
  headers: Headers {
    'content-length': '167',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:07:10 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'gBPRsBzuTomRvW4I2prcFg'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: false,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
3
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-length': '360',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:07:10 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'HHXQO0qeTRCbLdqnnpoFkQ'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
1
Response {
  status: 400,
  statusText: 'Bad Request',
  headers: Headers {
    'content-length': '167',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:07:13 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'h-rgEMtWSr-Rn4CMn6XIxQ'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: false,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}

11:08   -   Correct format appears to be `phoneNumber`
Confirmed:
GET /api/v1/patients/5551234567 304 22.708 ms - -
3
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-length': '360',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:08:33 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': '_YIq_ggSQ1Wcpx_1npoFkQ'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
0
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-length': '360',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:08:33 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'ysPXwjM8SF-KmsJO9I3ezw'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}

11:09   -   Response body is a ReadableStream

GET /api/v1/patients/5551234567 304 22.082 ms - -
0
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-length': '360',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:10:15 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'HIbCHy77TTCF1jVy-_9nXA'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
{ 'soap:Envelope': { 'soap:Body': { GetPatientResponse: [Object] } } }

11:14   -   Added xml2js to handle XML parsing, but it's repo appears to be down.
11:22   -   xmltojson loads, but either has errors or is incompatible
11:25   -   Trying xml-js, also errors on response
11:25   -   Got a 500, think I'm going too fast:
Response {
  status: 500,
  statusText: 'Internal Server Error',
  headers: Headers {
    'content-length': '45',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:25:51 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'J3fcyAKrTbekCbJd-_9nXA'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: false,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
{ error: 'Database connection timeout' }
11:26   -   Tried again with same request, looks like speed was the issue:

GET /api/v1/patients/5551234567 304 1.476 ms - -
0
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-length': '360',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:26:21 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'VMGcOHq2Tp-0gV-V-_9nXA'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
{ 'soap:Envelope': { 'soap:Body': { GetPatientResponse: [Object] } } }
undefined

11:28   -   Looking into pure SOAP libraries for Express, but they tend to want the WSDL, which I've not been able to located in the API tree
11:33   -   It's XML, lets use it like XML. Added jsdom so I can treat the XML like any other XML document.
11:35   -   jsdom doesn't support CommonJS, and refactoring the codebase to ECMAScript would eat up a lot of time so trying xmldom instead.
11:40   -   It runs, but is struggling with the structure of the response.
0
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-length': '360',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:41:23 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'NpwxdmiNTQuiNpg22prcFg'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
{ 'soap:Envelope': { 'soap:Body': { GetPatientResponse: [Object] } } }
[xmldom error]  invalid doc source
@#[line:0,col:undefined]
undefined
11:42   -   Both "text/xml" and "application/xml" fail
11:43   -   Switched to data["soap:Envelope"] to try to access response and I'm on the right track.
11:45   -   Following that thread, I don't even need the xml parsing.
11:46   -   Tada:
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-length': '360',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 18:46:10 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'dY5AZOWQTNaaWk8AnpoFkQ'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
{ 'soap:Envelope': { 'soap:Body': { GetPatientResponse: [Object] } } }
{ 'soap:Body': { GetPatientResponse: { Patient: [Object] } } }
{
  GetPatientResponse: {
    Patient: {
      dob: '03/15/1985',
      firstName: 'John',
      insuranceActive: 'Y',
      lastName: 'Smith',
      lastVisit: '2024-12-15',
      patientId: 'P001',
      phoneNumber: '(555) 123-4567'
    }
  }
}
{
  Patient: {
    dob: '03/15/1985',
    firstName: 'John',
    insuranceActive: 'Y',
    lastName: 'Smith',
    lastVisit: '2024-12-15',
    patientId: 'P001',
    phoneNumber: '(555) 123-4567'
  }
}
{
  dob: '03/15/1985',
  firstName: 'John',
  insuranceActive: 'Y',
  lastName: 'Smith',
  lastVisit: '2024-12-15',
  patientId: 'P001',
  phoneNumber: '(555) 123-4567'
}
11:53   -   Looks like I keep hitting the rate limiting, got a couple 500s in a row. Appears to be one request per minute?
12:07   -   Just made a call and got another 500, it's been some time since the last
GET /api/v1/patients/(555)%20123-4567 304 23.478 ms - -
GET /favicon.ico 404 242.775 ms - 1132
Response {
  status: 500,
  statusText: 'Internal Server Error',
  headers: Headers {
    'content-length': '45',
    'content-type': 'application/json',
    date: 'Tue, 24 Feb 2026 19:07:17 GMT',
    server: 'railway-edge',
    'x-railway-edge': 'railway/us-west2',
    'x-railway-request-id': 'JWTbsc3AR4i_i6VcLPU1MQ'
  },
  body: ReadableStream { locked: false, state: 'readable', supportsBYOB: true },
  bodyUsed: false,
  ok: false,
  redirected: false,
  type: 'basic',
  url: 'https://takehome-production.up.railway.app/soap/PatientService'
}
500 Internal Server Error

12:29 - Got endpoint 1 working for basic happy path, ran tests (3 pass, 17 fail), committed current draft of code.

12:34 - Updated the endpoint's return type and functionality and ran tests again for 5 passed, 15 failed. 
12:42 - I've rerun the tests a few times now. Many of them appear to be failing incorrectly and inconsistently, for example this one only fails sometimes:
____________________________________ TestPatientLookup.test_booleans_are_booleans _____________________________________

self = <test_requirements.TestPatientLookup object at 0x0000015DC527A610>

    def test_booleans_are_booleans(self):
        """Insurance status should be a real boolean, not a string"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        data = response.json()

>       assert isinstance(data['has_active_insurance'], bool), \
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            f"Expected bool, got {type(data['has_active_insurance'])}"
E       KeyError: 'has_active_insurance'

test_requirements.py:90: KeyError

12:53 - Added comments, tweaked a few things, ran tests for a final time. 7/13

Full terminal history below:

>           resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\requests\adapters.py:644:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:802: in urlopen
retries = retries.increment(
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = Retry(total=0, connect=None, read=False, redirect=None, status=None), method = 'GET'
url = '/api/v1/appointments/availability?date=2027-06-15&dentist_id=D001', response = None
error = NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA92A6250>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it')
_pool = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA92A6650>
_stacktrace = <traceback object at 0x0000018AA92A5180>

    def increment(
        self,
        method=None,
        url=None,
        response=None,
        error=None,
        _pool=None,
        _stacktrace=None,
    ):
        """Return a new Retry object with incremented retry counters.

        :param response: A response object, or None, if the server did not
            return a response.
        :type response: :class:`~urllib3.response.HTTPResponse`
        :param Exception error: An error encountered during the request, or
            None if the response was received successfully.

        :return: A new ``Retry`` object.
        """
        if self.total is False and error:
            # Disabled, indicate to re-raise the error.
            raise six.reraise(type(error), error, _stacktrace)

        total = self.total
        if total is not None:
            total -= 1

        connect = self.connect
        read = self.read
        redirect = self.redirect
        status_count = self.status
        other = self.other
        cause = "unknown"
        status = None
        redirect_location = None

        if error and self._is_connection_error(error):
            # Connect retry?
            if connect is False:
                raise six.reraise(type(error), error, _stacktrace)
            elif connect is not None:
                connect -= 1

        elif error and self._is_read_error(error):
            # Read retry?
            if read is False or not self._is_method_retryable(method):
                raise six.reraise(type(error), error, _stacktrace)
            elif read is not None:
                read -= 1

        elif error:
            # Other retry?
            if other is not None:
                other -= 1

        elif response and response.get_redirect_location():
            # Redirect retry?
            if redirect is not None:
                redirect -= 1
            cause = "too many redirects"
            redirect_location = response.get_redirect_location()
            status = response.status

        else:
            # Incrementing because of a server error like a 500 in
            # status_forcelist and the given method is in the allowed_methods
            cause = ResponseError.GENERIC_ERROR
            if response and response.status:
                if status_count is not None:
                    status_count -= 1
                cause = ResponseError.SPECIFIC_ERROR.format(status_code=response.status)
                status = response.status

        history = self.history + (
            RequestHistory(method, url, error, status, redirect_location),
        )

        new_retry = self.new(
            total=total,
            connect=connect,
            read=read,
            redirect=redirect,
            status=status_count,
            other=other,
            history=history,
        )

        if new_retry.is_exhausted():
>           raise MaxRetryError(_pool, url, error or ResponseError(cause))
E           urllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/availability?date=2027-06-15&dentist_id=D001 (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA92A6250>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\urllib3\util\retry.py:594: MaxRetryError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x0000018AA8C75490>

    def test_booked_slot_excluded_from_availability(self):
        """A known booked slot should not appear in availability results"""
>       response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': '2027-06-15', 'dentist_id': 'D001'}
        )

test_requirements.py:179:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\requests\api.py:73: in get
return request("get", url, params=params, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\api.py:59: in request
return session.request(method=method, url=url, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:589: in request
resp = self.send(prep, **send_kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:703: in send
r = adapter.send(request, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <requests.adapters.HTTPAdapter object at 0x0000018AA92A40D0>, request = <PreparedRequest [GET]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

>           raise ConnectionError(e, request=request)
E           requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/availability?date=2027-06-15&dentist_id=D001 (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA92A6250>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\requests\adapters.py:677: ConnectionError
___________________________________ TestAppointmentBooking.test_successful_booking ____________________________________

self = <urllib3.connection.HTTPConnection object at 0x0000018AA91C1AD0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
>           conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

C:\Python311\Lib\site-packages\urllib3\connection.py:174:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\util\connection.py:95: in create_connection
raise err
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

address = ('localhost', 3000), timeout = None, source_address = None, socket_options = [(6, 1, 1)]

    def create_connection(
        address,
        timeout=socket._GLOBAL_DEFAULT_TIMEOUT,
        source_address=None,
        socket_options=None,
    ):
        """Connect to *address* and return the socket object.

        Convenience function.  Connect to *address* (a 2-tuple ``(host,
        port)``) and return the socket object.  Passing the optional
        *timeout* parameter will set the timeout on the socket instance
        before attempting to connect.  If no *timeout* is supplied, the
        global default timeout setting returned by :func:`socket.getdefaulttimeout`
        is used.  If *source_address* is set it must be a tuple of (host, port)
        for the socket to bind as a source address before making the connection.
        An host of '' or port 0 tells the OS to use the default.
        """

        host, port = address
        if host.startswith("["):
            host = host.strip("[]")
        err = None

        # Using the value from allowed_gai_family() in the context of getaddrinfo lets
        # us select whether to work with IPv4 DNS records, IPv6 records, or both.
        # The original create_connection function always returns all records.
        family = allowed_gai_family()

        try:
            host.encode("idna")
        except UnicodeError:
            return six.raise_from(
                LocationParseError(u"'%s', label empty or too long" % host), None
            )

        for res in socket.getaddrinfo(host, port, family, socket.SOCK_STREAM):
            af, socktype, proto, canonname, sa = res
            sock = None
            try:
                sock = socket.socket(af, socktype, proto)

                # If provided, set socket level options before connecting.
                _set_socket_options(sock, socket_options)

                if timeout is not socket._GLOBAL_DEFAULT_TIMEOUT:
                    sock.settimeout(timeout)
                if source_address:
                    sock.bind(source_address)
>               sock.connect(sa)
E               ConnectionRefusedError: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\util\connection.py:85: ConnectionRefusedError

During handling of the above exception, another exception occurred:

self = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA91C3590>, method = 'POST'
url = '/api/v1/appointments/book'
body = b'{"patient_id": "P001", "dentist_id": "D001", "appointment_date": "2026-10-16", "appointment_time": "14:00", "reason": "Regular checkup"}'
headers = {'User-Agent': 'python-requests/2.32.5', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Content-Length': '136', 'Content-Type': 'application/json'}
retries = Retry(total=0, connect=None, read=False, redirect=None, status=None), redirect = False
assert_same_host = False, timeout = Timeout(connect=None, read=None, total=None), pool_timeout = None
release_conn = False, chunked = False, body_pos = None
response_kw = {'decode_content': False, 'preload_content': False}
parsed_url = Url(scheme=None, auth=None, host=None, port=None, path='/api/v1/appointments/book', query=None, fragment=None)
destination_scheme = None, conn = None, release_this_conn = True, http_tunnel_required = False, err = None
clean_exit = False

    def urlopen(
        self,
        method,
        url,
        body=None,
        headers=None,
        retries=None,
        redirect=True,
        assert_same_host=True,
        timeout=_Default,
        pool_timeout=None,
        release_conn=None,
        chunked=False,
        body_pos=None,
        **response_kw
    ):
        """
        Get a connection from the pool and perform an HTTP request. This is the
        lowest level call for making a request, so you'll need to specify all
        the raw details.

        .. note::

           More commonly, it's appropriate to use a convenience method provided
           by :class:`.RequestMethods`, such as :meth:`request`.

        .. note::

           `release_conn` will only behave as expected if
           `preload_content=False` because we want to make
           `preload_content=False` the default behaviour someday soon without
           breaking backwards compatibility.

        :param method:
            HTTP request method (such as GET, POST, PUT, etc.)

        :param url:
            The URL to perform the request on.

        :param body:
            Data to send in the request body, either :class:`str`, :class:`bytes`,
            an iterable of :class:`str`/:class:`bytes`, or a file-like object.

        :param headers:
            Dictionary of custom headers to send, such as User-Agent,
            If-None-Match, etc. If None, pool headers are used. If provided,
            these headers completely replace any pool-specific headers.

        :param retries:
            Configure the number of retries to allow before raising a
            :class:`~urllib3.exceptions.MaxRetryError` exception.

            Pass ``None`` to retry until you receive a response. Pass a
            :class:`~urllib3.util.retry.Retry` object for fine-grained control
            over different types of retries.
            Pass an integer number to retry connection errors that many times,
            but no other types of errors. Pass zero to never retry.

            If ``False``, then retries are disabled and any exception is raised
            immediately. Also, instead of raising a MaxRetryError on redirects,
            the redirect response will be returned.

        :type retries: :class:`~urllib3.util.retry.Retry`, False, or an int.

        :param redirect:
            If True, automatically handle redirects (status codes 301, 302,
            303, 307, 308). Each redirect counts as a retry. Disabling retries
            will disable redirect, too.

        :param assert_same_host:
            If ``True``, will make sure that the host of the pool requests is
            consistent else will raise HostChangedError. When ``False``, you can
            use the pool on an HTTP proxy and request foreign hosts.

        :param timeout:
            If specified, overrides the default timeout for this one
            request. It may be a float (in seconds) or an instance of
            :class:`urllib3.util.Timeout`.

        :param pool_timeout:
            If set and the pool is set to block=True, then this method will
            block for ``pool_timeout`` seconds and raise EmptyPoolError if no
            connection is available within the time period.

        :param release_conn:
            If False, then the urlopen call will not release the connection
            back into the pool once a response is received (but will release if
            you read the entire contents of the response such as when
            `preload_content=True`). This is useful if you're not preloading
            the response's content immediately. You will need to call
            ``r.release_conn()`` on the response ``r`` to return the connection
            back into the pool. If None, it takes the value of
            ``response_kw.get('preload_content', True)``.

        :param chunked:
            If True, urllib3 will send the body using chunked transfer
            encoding. Otherwise, urllib3 will send the body using the standard
            content-length form. Defaults to False.

        :param int body_pos:
            Position to seek to in file-like body in the event of a retry or
            redirect. Typically this won't need to be set because urllib3 will
            auto-populate the value when needed.

        :param \\**response_kw:
            Additional parameters are passed to
            :meth:`urllib3.response.HTTPResponse.from_httplib`
        """

        parsed_url = parse_url(url)
        destination_scheme = parsed_url.scheme

        if headers is None:
            headers = self.headers

        if not isinstance(retries, Retry):
            retries = Retry.from_int(retries, redirect=redirect, default=self.retries)

        if release_conn is None:
            release_conn = response_kw.get("preload_content", True)

        # Check host
        if assert_same_host and not self.is_same_host(url):
            raise HostChangedError(self, url, retries)

        # Ensure that the URL we're connecting to is properly encoded
        if url.startswith("/"):
            url = six.ensure_str(_encode_target(url))
        else:
            url = six.ensure_str(parsed_url.url)

        conn = None

        # Track whether `conn` needs to be released before
        # returning/raising/recursing. Update this variable if necessary, and
        # leave `release_conn` constant throughout the function. That way, if
        # the function recurses, the original value of `release_conn` will be
        # passed down into the recursive call, and its value will be respected.
        #
        # See issue #651 [1] for details.
        #
        # [1] <https://github.com/urllib3/urllib3/issues/651>
        release_this_conn = release_conn

        http_tunnel_required = connection_requires_http_tunnel(
            self.proxy, self.proxy_config, destination_scheme
        )

        # Merge the proxy headers. Only done when not using HTTP CONNECT. We
        # have to copy the headers dict so we can safely change it without those
        # changes being reflected in anyone else's copy.
        if not http_tunnel_required:
            headers = headers.copy()
            headers.update(self.proxy_headers)

        # Must keep the exception bound to a separate variable or else Python 3
        # complains about UnboundLocalError.
        err = None

        # Keep track of whether we cleanly exited the except block. This
        # ensures we do proper cleanup in finally.
        clean_exit = False

        # Rewind body position, if needed. Record current position
        # for future rewinds in the event of a redirect/retry.
        body_pos = set_file_position(body, body_pos)

        try:
            # Request a connection from the queue.
            timeout_obj = self._get_timeout(timeout)
            conn = self._get_conn(timeout=pool_timeout)

            conn.timeout = timeout_obj.connect_timeout

            is_new_proxy_conn = self.proxy is not None and not getattr(
                conn, "sock", None
            )
            if is_new_proxy_conn and http_tunnel_required:
                self._prepare_proxy(conn)

            # Make the request on the httplib connection object.
>           httplib_response = self._make_request(
                conn,
                method,
                url,
                timeout=timeout_obj,
                body=body,
                headers=headers,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\urllib3\connectionpool.py:716:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:416: in _make_request
conn.request(method, url, **httplib_request_kw)
C:\Python311\Lib\site-packages\urllib3\connection.py:244: in request
super(HTTPConnection, self).request(method, url, body=body, headers=headers)
C:\Python311\Lib\http\client.py:1282: in request
self._send_request(method, url, body, headers, encode_chunked)
C:\Python311\Lib\http\client.py:1328: in _send_request
self.endheaders(body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1277: in endheaders
self._send_output(message_body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1037: in _send_output
self.send(msg)
C:\Python311\Lib\http\client.py:975: in send
self.connect()
C:\Python311\Lib\site-packages\urllib3\connection.py:205: in connect
conn = self._new_conn()
^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <urllib3.connection.HTTPConnection object at 0x0000018AA91C1AD0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
            conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

        except SocketTimeout:
            raise ConnectTimeoutError(
                self,
                "Connection to %s timed out. (connect timeout=%s)"
                % (self.host, self.timeout),
            )

        except SocketError as e:
>           raise NewConnectionError(
                self, "Failed to establish a new connection: %s" % e
            )
E           urllib3.exceptions.NewConnectionError: <urllib3.connection.HTTPConnection object at 0x0000018AA91C1AD0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\connection.py:186: NewConnectionError

During handling of the above exception, another exception occurred:

self = <requests.adapters.HTTPAdapter object at 0x0000018AA91C09D0>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
>           resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\requests\adapters.py:644:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:802: in urlopen
retries = retries.increment(
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = Retry(total=0, connect=None, read=False, redirect=None, status=None), method = 'POST'
url = '/api/v1/appointments/book', response = None
error = NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA91C1AD0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it')
_pool = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA91C3590>
_stacktrace = <traceback object at 0x0000018AA91C01C0>

    def increment(
        self,
        method=None,
        url=None,
        response=None,
        error=None,
        _pool=None,
        _stacktrace=None,
    ):
        """Return a new Retry object with incremented retry counters.

        :param response: A response object, or None, if the server did not
            return a response.
        :type response: :class:`~urllib3.response.HTTPResponse`
        :param Exception error: An error encountered during the request, or
            None if the response was received successfully.

        :return: A new ``Retry`` object.
        """
        if self.total is False and error:
            # Disabled, indicate to re-raise the error.
            raise six.reraise(type(error), error, _stacktrace)

        total = self.total
        if total is not None:
            total -= 1

        connect = self.connect
        read = self.read
        redirect = self.redirect
        status_count = self.status
        other = self.other
        cause = "unknown"
        status = None
        redirect_location = None

        if error and self._is_connection_error(error):
            # Connect retry?
            if connect is False:
                raise six.reraise(type(error), error, _stacktrace)
            elif connect is not None:
                connect -= 1

        elif error and self._is_read_error(error):
            # Read retry?
            if read is False or not self._is_method_retryable(method):
                raise six.reraise(type(error), error, _stacktrace)
            elif read is not None:
                read -= 1

        elif error:
            # Other retry?
            if other is not None:
                other -= 1

        elif response and response.get_redirect_location():
            # Redirect retry?
            if redirect is not None:
                redirect -= 1
            cause = "too many redirects"
            redirect_location = response.get_redirect_location()
            status = response.status

        else:
            # Incrementing because of a server error like a 500 in
            # status_forcelist and the given method is in the allowed_methods
            cause = ResponseError.GENERIC_ERROR
            if response and response.status:
                if status_count is not None:
                    status_count -= 1
                cause = ResponseError.SPECIFIC_ERROR.format(status_code=response.status)
                status = response.status

        history = self.history + (
            RequestHistory(method, url, error, status, redirect_location),
        )

        new_retry = self.new(
            total=total,
            connect=connect,
            read=read,
            redirect=redirect,
            status=status_count,
            other=other,
            history=history,
        )

        if new_retry.is_exhausted():
>           raise MaxRetryError(_pool, url, error or ResponseError(cause))
E           urllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA91C1AD0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\urllib3\util\retry.py:594: MaxRetryError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentBooking object at 0x0000018AA8C58DD0>

    def test_successful_booking(self):
        """Should book an available slot and return confirmation"""
        future_weekday = _next_weekday(min_days_ahead=random.randint(30, 365))

>       response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P001",
            "dentist_id": "D001",
            "appointment_date": future_weekday,
            "appointment_time": "14:00",
            "reason": "Regular checkup"
        })

test_requirements.py:200:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\requests\api.py:115: in post
return request("post", url, data=data, json=json, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\api.py:59: in request
return session.request(method=method, url=url, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:589: in request
resp = self.send(prep, **send_kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:703: in send
r = adapter.send(request, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <requests.adapters.HTTPAdapter object at 0x0000018AA91C09D0>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

>           raise ConnectionError(e, request=request)
E           requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA91C1AD0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\requests\adapters.py:677: ConnectionError
_____________________________ TestAppointmentBooking.test_nonexistent_patient_returns_404 _____________________________

self = <urllib3.connection.HTTPConnection object at 0x0000018AA92F03D0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
>           conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

C:\Python311\Lib\site-packages\urllib3\connection.py:174:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\util\connection.py:95: in create_connection
raise err
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

address = ('localhost', 3000), timeout = None, source_address = None, socket_options = [(6, 1, 1)]

    def create_connection(
        address,
        timeout=socket._GLOBAL_DEFAULT_TIMEOUT,
        source_address=None,
        socket_options=None,
    ):
        """Connect to *address* and return the socket object.

        Convenience function.  Connect to *address* (a 2-tuple ``(host,
        port)``) and return the socket object.  Passing the optional
        *timeout* parameter will set the timeout on the socket instance
        before attempting to connect.  If no *timeout* is supplied, the
        global default timeout setting returned by :func:`socket.getdefaulttimeout`
        is used.  If *source_address* is set it must be a tuple of (host, port)
        for the socket to bind as a source address before making the connection.
        An host of '' or port 0 tells the OS to use the default.
        """

        host, port = address
        if host.startswith("["):
            host = host.strip("[]")
        err = None

        # Using the value from allowed_gai_family() in the context of getaddrinfo lets
        # us select whether to work with IPv4 DNS records, IPv6 records, or both.
        # The original create_connection function always returns all records.
        family = allowed_gai_family()

        try:
            host.encode("idna")
        except UnicodeError:
            return six.raise_from(
                LocationParseError(u"'%s', label empty or too long" % host), None
            )

        for res in socket.getaddrinfo(host, port, family, socket.SOCK_STREAM):
            af, socktype, proto, canonname, sa = res
            sock = None
            try:
                sock = socket.socket(af, socktype, proto)

                # If provided, set socket level options before connecting.
                _set_socket_options(sock, socket_options)

                if timeout is not socket._GLOBAL_DEFAULT_TIMEOUT:
                    sock.settimeout(timeout)
                if source_address:
                    sock.bind(source_address)
>               sock.connect(sa)
E               ConnectionRefusedError: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\util\connection.py:85: ConnectionRefusedError

During handling of the above exception, another exception occurred:

self = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA92F1C10>, method = 'POST'
url = '/api/v1/appointments/book'
body = b'{"patient_id": "P999", "dentist_id": "D001", "appointment_date": "2026-02-25", "appointment_time": "15:00", "reason": "Checkup"}'
headers = {'User-Agent': 'python-requests/2.32.5', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Content-Length': '128', 'Content-Type': 'application/json'}
retries = Retry(total=0, connect=None, read=False, redirect=None, status=None), redirect = False
assert_same_host = False, timeout = Timeout(connect=None, read=None, total=None), pool_timeout = None
release_conn = False, chunked = False, body_pos = None
response_kw = {'decode_content': False, 'preload_content': False}
parsed_url = Url(scheme=None, auth=None, host=None, port=None, path='/api/v1/appointments/book', query=None, fragment=None)
destination_scheme = None, conn = None, release_this_conn = True, http_tunnel_required = False, err = None
clean_exit = False

    def urlopen(
        self,
        method,
        url,
        body=None,
        headers=None,
        retries=None,
        redirect=True,
        assert_same_host=True,
        timeout=_Default,
        pool_timeout=None,
        release_conn=None,
        chunked=False,
        body_pos=None,
        **response_kw
    ):
        """
        Get a connection from the pool and perform an HTTP request. This is the
        lowest level call for making a request, so you'll need to specify all
        the raw details.

        .. note::

           More commonly, it's appropriate to use a convenience method provided
           by :class:`.RequestMethods`, such as :meth:`request`.

        .. note::

           `release_conn` will only behave as expected if
           `preload_content=False` because we want to make
           `preload_content=False` the default behaviour someday soon without
           breaking backwards compatibility.

        :param method:
            HTTP request method (such as GET, POST, PUT, etc.)

        :param url:
            The URL to perform the request on.

        :param body:
            Data to send in the request body, either :class:`str`, :class:`bytes`,
            an iterable of :class:`str`/:class:`bytes`, or a file-like object.

        :param headers:
            Dictionary of custom headers to send, such as User-Agent,
            If-None-Match, etc. If None, pool headers are used. If provided,
            these headers completely replace any pool-specific headers.

        :param retries:
            Configure the number of retries to allow before raising a
            :class:`~urllib3.exceptions.MaxRetryError` exception.

            Pass ``None`` to retry until you receive a response. Pass a
            :class:`~urllib3.util.retry.Retry` object for fine-grained control
            over different types of retries.
            Pass an integer number to retry connection errors that many times,
            but no other types of errors. Pass zero to never retry.

            If ``False``, then retries are disabled and any exception is raised
            immediately. Also, instead of raising a MaxRetryError on redirects,
            the redirect response will be returned.

        :type retries: :class:`~urllib3.util.retry.Retry`, False, or an int.

        :param redirect:
            If True, automatically handle redirects (status codes 301, 302,
            303, 307, 308). Each redirect counts as a retry. Disabling retries
            will disable redirect, too.

        :param assert_same_host:
            If ``True``, will make sure that the host of the pool requests is
            consistent else will raise HostChangedError. When ``False``, you can
            use the pool on an HTTP proxy and request foreign hosts.

        :param timeout:
            If specified, overrides the default timeout for this one
            request. It may be a float (in seconds) or an instance of
            :class:`urllib3.util.Timeout`.

        :param pool_timeout:
            If set and the pool is set to block=True, then this method will
            block for ``pool_timeout`` seconds and raise EmptyPoolError if no
            connection is available within the time period.

        :param release_conn:
            If False, then the urlopen call will not release the connection
            back into the pool once a response is received (but will release if
            you read the entire contents of the response such as when
            `preload_content=True`). This is useful if you're not preloading
            the response's content immediately. You will need to call
            ``r.release_conn()`` on the response ``r`` to return the connection
            back into the pool. If None, it takes the value of
            ``response_kw.get('preload_content', True)``.

        :param chunked:
            If True, urllib3 will send the body using chunked transfer
            encoding. Otherwise, urllib3 will send the body using the standard
            content-length form. Defaults to False.

        :param int body_pos:
            Position to seek to in file-like body in the event of a retry or
            redirect. Typically this won't need to be set because urllib3 will
            auto-populate the value when needed.

        :param \\**response_kw:
            Additional parameters are passed to
            :meth:`urllib3.response.HTTPResponse.from_httplib`
        """

        parsed_url = parse_url(url)
        destination_scheme = parsed_url.scheme

        if headers is None:
            headers = self.headers

        if not isinstance(retries, Retry):
            retries = Retry.from_int(retries, redirect=redirect, default=self.retries)

        if release_conn is None:
            release_conn = response_kw.get("preload_content", True)

        # Check host
        if assert_same_host and not self.is_same_host(url):
            raise HostChangedError(self, url, retries)

        # Ensure that the URL we're connecting to is properly encoded
        if url.startswith("/"):
            url = six.ensure_str(_encode_target(url))
        else:
            url = six.ensure_str(parsed_url.url)

        conn = None

        # Track whether `conn` needs to be released before
        # returning/raising/recursing. Update this variable if necessary, and
        # leave `release_conn` constant throughout the function. That way, if
        # the function recurses, the original value of `release_conn` will be
        # passed down into the recursive call, and its value will be respected.
        #
        # See issue #651 [1] for details.
        #
        # [1] <https://github.com/urllib3/urllib3/issues/651>
        release_this_conn = release_conn

        http_tunnel_required = connection_requires_http_tunnel(
            self.proxy, self.proxy_config, destination_scheme
        )

        # Merge the proxy headers. Only done when not using HTTP CONNECT. We
        # have to copy the headers dict so we can safely change it without those
        # changes being reflected in anyone else's copy.
        if not http_tunnel_required:
            headers = headers.copy()
            headers.update(self.proxy_headers)

        # Must keep the exception bound to a separate variable or else Python 3
        # complains about UnboundLocalError.
        err = None

        # Keep track of whether we cleanly exited the except block. This
        # ensures we do proper cleanup in finally.
        clean_exit = False

        # Rewind body position, if needed. Record current position
        # for future rewinds in the event of a redirect/retry.
        body_pos = set_file_position(body, body_pos)

        try:
            # Request a connection from the queue.
            timeout_obj = self._get_timeout(timeout)
            conn = self._get_conn(timeout=pool_timeout)

            conn.timeout = timeout_obj.connect_timeout

            is_new_proxy_conn = self.proxy is not None and not getattr(
                conn, "sock", None
            )
            if is_new_proxy_conn and http_tunnel_required:
                self._prepare_proxy(conn)

            # Make the request on the httplib connection object.
>           httplib_response = self._make_request(
                conn,
                method,
                url,
                timeout=timeout_obj,
                body=body,
                headers=headers,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\urllib3\connectionpool.py:716:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:416: in _make_request
conn.request(method, url, **httplib_request_kw)
C:\Python311\Lib\site-packages\urllib3\connection.py:244: in request
super(HTTPConnection, self).request(method, url, body=body, headers=headers)
C:\Python311\Lib\http\client.py:1282: in request
self._send_request(method, url, body, headers, encode_chunked)
C:\Python311\Lib\http\client.py:1328: in _send_request
self.endheaders(body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1277: in endheaders
self._send_output(message_body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1037: in _send_output
self.send(msg)
C:\Python311\Lib\http\client.py:975: in send
self.connect()
C:\Python311\Lib\site-packages\urllib3\connection.py:205: in connect
conn = self._new_conn()
^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <urllib3.connection.HTTPConnection object at 0x0000018AA92F03D0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
            conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

        except SocketTimeout:
            raise ConnectTimeoutError(
                self,
                "Connection to %s timed out. (connect timeout=%s)"
                % (self.host, self.timeout),
            )

        except SocketError as e:
>           raise NewConnectionError(
                self, "Failed to establish a new connection: %s" % e
            )
E           urllib3.exceptions.NewConnectionError: <urllib3.connection.HTTPConnection object at 0x0000018AA92F03D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\connection.py:186: NewConnectionError

During handling of the above exception, another exception occurred:

self = <requests.adapters.HTTPAdapter object at 0x0000018AA92F2690>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
>           resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\requests\adapters.py:644:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:802: in urlopen
retries = retries.increment(
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = Retry(total=0, connect=None, read=False, redirect=None, status=None), method = 'POST'
url = '/api/v1/appointments/book', response = None
error = NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA92F03D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it')
_pool = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA92F1C10>
_stacktrace = <traceback object at 0x0000018AA92F0C00>

    def increment(
        self,
        method=None,
        url=None,
        response=None,
        error=None,
        _pool=None,
        _stacktrace=None,
    ):
        """Return a new Retry object with incremented retry counters.

        :param response: A response object, or None, if the server did not
            return a response.
        :type response: :class:`~urllib3.response.HTTPResponse`
        :param Exception error: An error encountered during the request, or
            None if the response was received successfully.

        :return: A new ``Retry`` object.
        """
        if self.total is False and error:
            # Disabled, indicate to re-raise the error.
            raise six.reraise(type(error), error, _stacktrace)

        total = self.total
        if total is not None:
            total -= 1

        connect = self.connect
        read = self.read
        redirect = self.redirect
        status_count = self.status
        other = self.other
        cause = "unknown"
        status = None
        redirect_location = None

        if error and self._is_connection_error(error):
            # Connect retry?
            if connect is False:
                raise six.reraise(type(error), error, _stacktrace)
            elif connect is not None:
                connect -= 1

        elif error and self._is_read_error(error):
            # Read retry?
            if read is False or not self._is_method_retryable(method):
                raise six.reraise(type(error), error, _stacktrace)
            elif read is not None:
                read -= 1

        elif error:
            # Other retry?
            if other is not None:
                other -= 1

        elif response and response.get_redirect_location():
            # Redirect retry?
            if redirect is not None:
                redirect -= 1
            cause = "too many redirects"
            redirect_location = response.get_redirect_location()
            status = response.status

        else:
            # Incrementing because of a server error like a 500 in
            # status_forcelist and the given method is in the allowed_methods
            cause = ResponseError.GENERIC_ERROR
            if response and response.status:
                if status_count is not None:
                    status_count -= 1
                cause = ResponseError.SPECIFIC_ERROR.format(status_code=response.status)
                status = response.status

        history = self.history + (
            RequestHistory(method, url, error, status, redirect_location),
        )

        new_retry = self.new(
            total=total,
            connect=connect,
            read=read,
            redirect=redirect,
            status=status_count,
            other=other,
            history=history,
        )

        if new_retry.is_exhausted():
>           raise MaxRetryError(_pool, url, error or ResponseError(cause))
E           urllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA92F03D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\urllib3\util\retry.py:594: MaxRetryError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentBooking object at 0x0000018AA8C59750>

    def test_nonexistent_patient_returns_404(self):
        """Booking for a patient that doesn't exist should fail"""
        weekday = _next_weekday()

>       response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P999",
            "dentist_id": "D001",
            "appointment_date": weekday,
            "appointment_time": "15:00",
            "reason": "Checkup"
        })

test_requirements.py:218:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\requests\api.py:115: in post
return request("post", url, data=data, json=json, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\api.py:59: in request
return session.request(method=method, url=url, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:589: in request
resp = self.send(prep, **send_kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:703: in send
r = adapter.send(request, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <requests.adapters.HTTPAdapter object at 0x0000018AA92F2690>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

>           raise ConnectionError(e, request=request)
E           requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA92F03D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\requests\adapters.py:677: ConnectionError
_______________________________ TestAppointmentBooking.test_seeded_conflict_returns_409 _______________________________

self = <urllib3.connection.HTTPConnection object at 0x0000018AA9296FD0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
>           conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

C:\Python311\Lib\site-packages\urllib3\connection.py:174:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\util\connection.py:95: in create_connection
raise err
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

address = ('localhost', 3000), timeout = None, source_address = None, socket_options = [(6, 1, 1)]

    def create_connection(
        address,
        timeout=socket._GLOBAL_DEFAULT_TIMEOUT,
        source_address=None,
        socket_options=None,
    ):
        """Connect to *address* and return the socket object.

        Convenience function.  Connect to *address* (a 2-tuple ``(host,
        port)``) and return the socket object.  Passing the optional
        *timeout* parameter will set the timeout on the socket instance
        before attempting to connect.  If no *timeout* is supplied, the
        global default timeout setting returned by :func:`socket.getdefaulttimeout`
        is used.  If *source_address* is set it must be a tuple of (host, port)
        for the socket to bind as a source address before making the connection.
        An host of '' or port 0 tells the OS to use the default.
        """

        host, port = address
        if host.startswith("["):
            host = host.strip("[]")
        err = None

        # Using the value from allowed_gai_family() in the context of getaddrinfo lets
        # us select whether to work with IPv4 DNS records, IPv6 records, or both.
        # The original create_connection function always returns all records.
        family = allowed_gai_family()

        try:
            host.encode("idna")
        except UnicodeError:
            return six.raise_from(
                LocationParseError(u"'%s', label empty or too long" % host), None
            )

        for res in socket.getaddrinfo(host, port, family, socket.SOCK_STREAM):
            af, socktype, proto, canonname, sa = res
            sock = None
            try:
                sock = socket.socket(af, socktype, proto)

                # If provided, set socket level options before connecting.
                _set_socket_options(sock, socket_options)

                if timeout is not socket._GLOBAL_DEFAULT_TIMEOUT:
                    sock.settimeout(timeout)
                if source_address:
                    sock.bind(source_address)
>               sock.connect(sa)
E               ConnectionRefusedError: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\util\connection.py:85: ConnectionRefusedError

During handling of the above exception, another exception occurred:

self = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA9297C10>, method = 'POST'
url = '/api/v1/appointments/book'
body = b'{"patient_id": "P002", "dentist_id": "D001", "appointment_date": "2027-06-15", "appointment_time": "10:00", "reason": "Conflict test"}'
headers = {'User-Agent': 'python-requests/2.32.5', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Content-Length': '134', 'Content-Type': 'application/json'}
retries = Retry(total=0, connect=None, read=False, redirect=None, status=None), redirect = False
assert_same_host = False, timeout = Timeout(connect=None, read=None, total=None), pool_timeout = None
release_conn = False, chunked = False, body_pos = None
response_kw = {'decode_content': False, 'preload_content': False}
parsed_url = Url(scheme=None, auth=None, host=None, port=None, path='/api/v1/appointments/book', query=None, fragment=None)
destination_scheme = None, conn = None, release_this_conn = True, http_tunnel_required = False, err = None
clean_exit = False

    def urlopen(
        self,
        method,
        url,
        body=None,
        headers=None,
        retries=None,
        redirect=True,
        assert_same_host=True,
        timeout=_Default,
        pool_timeout=None,
        release_conn=None,
        chunked=False,
        body_pos=None,
        **response_kw
    ):
        """
        Get a connection from the pool and perform an HTTP request. This is the
        lowest level call for making a request, so you'll need to specify all
        the raw details.

        .. note::

           More commonly, it's appropriate to use a convenience method provided
           by :class:`.RequestMethods`, such as :meth:`request`.

        .. note::

           `release_conn` will only behave as expected if
           `preload_content=False` because we want to make
           `preload_content=False` the default behaviour someday soon without
           breaking backwards compatibility.

        :param method:
            HTTP request method (such as GET, POST, PUT, etc.)

        :param url:
            The URL to perform the request on.

        :param body:
            Data to send in the request body, either :class:`str`, :class:`bytes`,
            an iterable of :class:`str`/:class:`bytes`, or a file-like object.

        :param headers:
            Dictionary of custom headers to send, such as User-Agent,
            If-None-Match, etc. If None, pool headers are used. If provided,
            these headers completely replace any pool-specific headers.

        :param retries:
            Configure the number of retries to allow before raising a
            :class:`~urllib3.exceptions.MaxRetryError` exception.

            Pass ``None`` to retry until you receive a response. Pass a
            :class:`~urllib3.util.retry.Retry` object for fine-grained control
            over different types of retries.
            Pass an integer number to retry connection errors that many times,
            but no other types of errors. Pass zero to never retry.

            If ``False``, then retries are disabled and any exception is raised
            immediately. Also, instead of raising a MaxRetryError on redirects,
            the redirect response will be returned.

        :type retries: :class:`~urllib3.util.retry.Retry`, False, or an int.

        :param redirect:
            If True, automatically handle redirects (status codes 301, 302,
            303, 307, 308). Each redirect counts as a retry. Disabling retries
            will disable redirect, too.

        :param assert_same_host:
            If ``True``, will make sure that the host of the pool requests is
            consistent else will raise HostChangedError. When ``False``, you can
            use the pool on an HTTP proxy and request foreign hosts.

        :param timeout:
            If specified, overrides the default timeout for this one
            request. It may be a float (in seconds) or an instance of
            :class:`urllib3.util.Timeout`.

        :param pool_timeout:
            If set and the pool is set to block=True, then this method will
            block for ``pool_timeout`` seconds and raise EmptyPoolError if no
            connection is available within the time period.

        :param release_conn:
            If False, then the urlopen call will not release the connection
            back into the pool once a response is received (but will release if
            you read the entire contents of the response such as when
            `preload_content=True`). This is useful if you're not preloading
            the response's content immediately. You will need to call
            ``r.release_conn()`` on the response ``r`` to return the connection
            back into the pool. If None, it takes the value of
            ``response_kw.get('preload_content', True)``.

        :param chunked:
            If True, urllib3 will send the body using chunked transfer
            encoding. Otherwise, urllib3 will send the body using the standard
            content-length form. Defaults to False.

        :param int body_pos:
            Position to seek to in file-like body in the event of a retry or
            redirect. Typically this won't need to be set because urllib3 will
            auto-populate the value when needed.

        :param \\**response_kw:
            Additional parameters are passed to
            :meth:`urllib3.response.HTTPResponse.from_httplib`
        """

        parsed_url = parse_url(url)
        destination_scheme = parsed_url.scheme

        if headers is None:
            headers = self.headers

        if not isinstance(retries, Retry):
            retries = Retry.from_int(retries, redirect=redirect, default=self.retries)

        if release_conn is None:
            release_conn = response_kw.get("preload_content", True)

        # Check host
        if assert_same_host and not self.is_same_host(url):
            raise HostChangedError(self, url, retries)

        # Ensure that the URL we're connecting to is properly encoded
        if url.startswith("/"):
            url = six.ensure_str(_encode_target(url))
        else:
            url = six.ensure_str(parsed_url.url)

        conn = None

        # Track whether `conn` needs to be released before
        # returning/raising/recursing. Update this variable if necessary, and
        # leave `release_conn` constant throughout the function. That way, if
        # the function recurses, the original value of `release_conn` will be
        # passed down into the recursive call, and its value will be respected.
        #
        # See issue #651 [1] for details.
        #
        # [1] <https://github.com/urllib3/urllib3/issues/651>
        release_this_conn = release_conn

        http_tunnel_required = connection_requires_http_tunnel(
            self.proxy, self.proxy_config, destination_scheme
        )

        # Merge the proxy headers. Only done when not using HTTP CONNECT. We
        # have to copy the headers dict so we can safely change it without those
        # changes being reflected in anyone else's copy.
        if not http_tunnel_required:
            headers = headers.copy()
            headers.update(self.proxy_headers)

        # Must keep the exception bound to a separate variable or else Python 3
        # complains about UnboundLocalError.
        err = None

        # Keep track of whether we cleanly exited the except block. This
        # ensures we do proper cleanup in finally.
        clean_exit = False

        # Rewind body position, if needed. Record current position
        # for future rewinds in the event of a redirect/retry.
        body_pos = set_file_position(body, body_pos)

        try:
            # Request a connection from the queue.
            timeout_obj = self._get_timeout(timeout)
            conn = self._get_conn(timeout=pool_timeout)

            conn.timeout = timeout_obj.connect_timeout

            is_new_proxy_conn = self.proxy is not None and not getattr(
                conn, "sock", None
            )
            if is_new_proxy_conn and http_tunnel_required:
                self._prepare_proxy(conn)

            # Make the request on the httplib connection object.
>           httplib_response = self._make_request(
                conn,
                method,
                url,
                timeout=timeout_obj,
                body=body,
                headers=headers,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\urllib3\connectionpool.py:716:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:416: in _make_request
conn.request(method, url, **httplib_request_kw)
C:\Python311\Lib\site-packages\urllib3\connection.py:244: in request
super(HTTPConnection, self).request(method, url, body=body, headers=headers)
C:\Python311\Lib\http\client.py:1282: in request
self._send_request(method, url, body, headers, encode_chunked)
C:\Python311\Lib\http\client.py:1328: in _send_request
self.endheaders(body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1277: in endheaders
self._send_output(message_body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1037: in _send_output
self.send(msg)
C:\Python311\Lib\http\client.py:975: in send
self.connect()
C:\Python311\Lib\site-packages\urllib3\connection.py:205: in connect
conn = self._new_conn()
^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <urllib3.connection.HTTPConnection object at 0x0000018AA9296FD0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
            conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

        except SocketTimeout:
            raise ConnectTimeoutError(
                self,
                "Connection to %s timed out. (connect timeout=%s)"
                % (self.host, self.timeout),
            )

        except SocketError as e:
>           raise NewConnectionError(
                self, "Failed to establish a new connection: %s" % e
            )
E           urllib3.exceptions.NewConnectionError: <urllib3.connection.HTTPConnection object at 0x0000018AA9296FD0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\connection.py:186: NewConnectionError

During handling of the above exception, another exception occurred:

self = <requests.adapters.HTTPAdapter object at 0x0000018AA9295B50>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
>           resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\requests\adapters.py:644:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:802: in urlopen
retries = retries.increment(
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = Retry(total=0, connect=None, read=False, redirect=None, status=None), method = 'POST'
url = '/api/v1/appointments/book', response = None
error = NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA9296FD0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it')
_pool = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA9297C10>
_stacktrace = <traceback object at 0x0000018AA9295600>

    def increment(
        self,
        method=None,
        url=None,
        response=None,
        error=None,
        _pool=None,
        _stacktrace=None,
    ):
        """Return a new Retry object with incremented retry counters.

        :param response: A response object, or None, if the server did not
            return a response.
        :type response: :class:`~urllib3.response.HTTPResponse`
        :param Exception error: An error encountered during the request, or
            None if the response was received successfully.

        :return: A new ``Retry`` object.
        """
        if self.total is False and error:
            # Disabled, indicate to re-raise the error.
            raise six.reraise(type(error), error, _stacktrace)

        total = self.total
        if total is not None:
            total -= 1

        connect = self.connect
        read = self.read
        redirect = self.redirect
        status_count = self.status
        other = self.other
        cause = "unknown"
        status = None
        redirect_location = None

        if error and self._is_connection_error(error):
            # Connect retry?
            if connect is False:
                raise six.reraise(type(error), error, _stacktrace)
            elif connect is not None:
                connect -= 1

        elif error and self._is_read_error(error):
            # Read retry?
            if read is False or not self._is_method_retryable(method):
                raise six.reraise(type(error), error, _stacktrace)
            elif read is not None:
                read -= 1

        elif error:
            # Other retry?
            if other is not None:
                other -= 1

        elif response and response.get_redirect_location():
            # Redirect retry?
            if redirect is not None:
                redirect -= 1
            cause = "too many redirects"
            redirect_location = response.get_redirect_location()
            status = response.status

        else:
            # Incrementing because of a server error like a 500 in
            # status_forcelist and the given method is in the allowed_methods
            cause = ResponseError.GENERIC_ERROR
            if response and response.status:
                if status_count is not None:
                    status_count -= 1
                cause = ResponseError.SPECIFIC_ERROR.format(status_code=response.status)
                status = response.status

        history = self.history + (
            RequestHistory(method, url, error, status, redirect_location),
        )

        new_retry = self.new(
            total=total,
            connect=connect,
            read=read,
            redirect=redirect,
            status=status_count,
            other=other,
            history=history,
        )

        if new_retry.is_exhausted():
>           raise MaxRetryError(_pool, url, error or ResponseError(cause))
E           urllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA9296FD0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\urllib3\util\retry.py:594: MaxRetryError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentBooking object at 0x0000018AA8C58F90>

    def test_seeded_conflict_returns_409(self):
        """Booking an already-occupied slot should return 409.
        The slot 2027-06-15 at 10:00 with D001 is pre-booked in the legacy system."""
>       response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P002",
            "dentist_id": "D001",
            "appointment_date": "2027-06-15",
            "appointment_time": "10:00",
            "reason": "Conflict test"
        })

test_requirements.py:230:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\requests\api.py:115: in post
return request("post", url, data=data, json=json, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\api.py:59: in request
return session.request(method=method, url=url, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:589: in request
resp = self.send(prep, **send_kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:703: in send
r = adapter.send(request, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <requests.adapters.HTTPAdapter object at 0x0000018AA9295B50>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

>           raise ConnectionError(e, request=request)
E           requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA9296FD0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\requests\adapters.py:677: ConnectionError
___________________________________ TestAppointmentBooking.test_idempotent_booking ____________________________________

self = <urllib3.connection.HTTPConnection object at 0x0000018AA942E9D0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
>           conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

C:\Python311\Lib\site-packages\urllib3\connection.py:174:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\util\connection.py:95: in create_connection
raise err
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

address = ('localhost', 3000), timeout = None, source_address = None, socket_options = [(6, 1, 1)]

    def create_connection(
        address,
        timeout=socket._GLOBAL_DEFAULT_TIMEOUT,
        source_address=None,
        socket_options=None,
    ):
        """Connect to *address* and return the socket object.

        Convenience function.  Connect to *address* (a 2-tuple ``(host,
        port)``) and return the socket object.  Passing the optional
        *timeout* parameter will set the timeout on the socket instance
        before attempting to connect.  If no *timeout* is supplied, the
        global default timeout setting returned by :func:`socket.getdefaulttimeout`
        is used.  If *source_address* is set it must be a tuple of (host, port)
        for the socket to bind as a source address before making the connection.
        An host of '' or port 0 tells the OS to use the default.
        """

        host, port = address
        if host.startswith("["):
            host = host.strip("[]")
        err = None

        # Using the value from allowed_gai_family() in the context of getaddrinfo lets
        # us select whether to work with IPv4 DNS records, IPv6 records, or both.
        # The original create_connection function always returns all records.
        family = allowed_gai_family()

        try:
            host.encode("idna")
        except UnicodeError:
            return six.raise_from(
                LocationParseError(u"'%s', label empty or too long" % host), None
            )

        for res in socket.getaddrinfo(host, port, family, socket.SOCK_STREAM):
            af, socktype, proto, canonname, sa = res
            sock = None
            try:
                sock = socket.socket(af, socktype, proto)

                # If provided, set socket level options before connecting.
                _set_socket_options(sock, socket_options)

                if timeout is not socket._GLOBAL_DEFAULT_TIMEOUT:
                    sock.settimeout(timeout)
                if source_address:
                    sock.bind(source_address)
>               sock.connect(sa)
E               ConnectionRefusedError: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\util\connection.py:85: ConnectionRefusedError

During handling of the above exception, another exception occurred:

self = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA942C610>, method = 'POST'
url = '/api/v1/appointments/book'
body = b'{"patient_id": "P001", "dentist_id": "D002", "appointment_date": "2027-07-09", "appointment_time": "15:30", "reason": "Idempotency test"}'
headers = {'User-Agent': 'python-requests/2.32.5', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Content-Length': '137', 'Content-Type': 'application/json'}
retries = Retry(total=0, connect=None, read=False, redirect=None, status=None), redirect = False
assert_same_host = False, timeout = Timeout(connect=None, read=None, total=None), pool_timeout = None
release_conn = False, chunked = False, body_pos = None
response_kw = {'decode_content': False, 'preload_content': False}
parsed_url = Url(scheme=None, auth=None, host=None, port=None, path='/api/v1/appointments/book', query=None, fragment=None)
destination_scheme = None, conn = None, release_this_conn = True, http_tunnel_required = False, err = None
clean_exit = False

    def urlopen(
        self,
        method,
        url,
        body=None,
        headers=None,
        retries=None,
        redirect=True,
        assert_same_host=True,
        timeout=_Default,
        pool_timeout=None,
        release_conn=None,
        chunked=False,
        body_pos=None,
        **response_kw
    ):
        """
        Get a connection from the pool and perform an HTTP request. This is the
        lowest level call for making a request, so you'll need to specify all
        the raw details.

        .. note::

           More commonly, it's appropriate to use a convenience method provided
           by :class:`.RequestMethods`, such as :meth:`request`.

        .. note::

           `release_conn` will only behave as expected if
           `preload_content=False` because we want to make
           `preload_content=False` the default behaviour someday soon without
           breaking backwards compatibility.

        :param method:
            HTTP request method (such as GET, POST, PUT, etc.)

        :param url:
            The URL to perform the request on.

        :param body:
            Data to send in the request body, either :class:`str`, :class:`bytes`,
            an iterable of :class:`str`/:class:`bytes`, or a file-like object.

        :param headers:
            Dictionary of custom headers to send, such as User-Agent,
            If-None-Match, etc. If None, pool headers are used. If provided,
            these headers completely replace any pool-specific headers.

        :param retries:
            Configure the number of retries to allow before raising a
            :class:`~urllib3.exceptions.MaxRetryError` exception.

            Pass ``None`` to retry until you receive a response. Pass a
            :class:`~urllib3.util.retry.Retry` object for fine-grained control
            over different types of retries.
            Pass an integer number to retry connection errors that many times,
            but no other types of errors. Pass zero to never retry.

            If ``False``, then retries are disabled and any exception is raised
            immediately. Also, instead of raising a MaxRetryError on redirects,
            the redirect response will be returned.

        :type retries: :class:`~urllib3.util.retry.Retry`, False, or an int.

        :param redirect:
            If True, automatically handle redirects (status codes 301, 302,
            303, 307, 308). Each redirect counts as a retry. Disabling retries
            will disable redirect, too.

        :param assert_same_host:
            If ``True``, will make sure that the host of the pool requests is
            consistent else will raise HostChangedError. When ``False``, you can
            use the pool on an HTTP proxy and request foreign hosts.

        :param timeout:
            If specified, overrides the default timeout for this one
            request. It may be a float (in seconds) or an instance of
            :class:`urllib3.util.Timeout`.

        :param pool_timeout:
            If set and the pool is set to block=True, then this method will
            block for ``pool_timeout`` seconds and raise EmptyPoolError if no
            connection is available within the time period.

        :param release_conn:
            If False, then the urlopen call will not release the connection
            back into the pool once a response is received (but will release if
            you read the entire contents of the response such as when
            `preload_content=True`). This is useful if you're not preloading
            the response's content immediately. You will need to call
            ``r.release_conn()`` on the response ``r`` to return the connection
            back into the pool. If None, it takes the value of
            ``response_kw.get('preload_content', True)``.

        :param chunked:
            If True, urllib3 will send the body using chunked transfer
            encoding. Otherwise, urllib3 will send the body using the standard
            content-length form. Defaults to False.

        :param int body_pos:
            Position to seek to in file-like body in the event of a retry or
            redirect. Typically this won't need to be set because urllib3 will
            auto-populate the value when needed.

        :param \\**response_kw:
            Additional parameters are passed to
            :meth:`urllib3.response.HTTPResponse.from_httplib`
        """

        parsed_url = parse_url(url)
        destination_scheme = parsed_url.scheme

        if headers is None:
            headers = self.headers

        if not isinstance(retries, Retry):
            retries = Retry.from_int(retries, redirect=redirect, default=self.retries)

        if release_conn is None:
            release_conn = response_kw.get("preload_content", True)

        # Check host
        if assert_same_host and not self.is_same_host(url):
            raise HostChangedError(self, url, retries)

        # Ensure that the URL we're connecting to is properly encoded
        if url.startswith("/"):
            url = six.ensure_str(_encode_target(url))
        else:
            url = six.ensure_str(parsed_url.url)

        conn = None

        # Track whether `conn` needs to be released before
        # returning/raising/recursing. Update this variable if necessary, and
        # leave `release_conn` constant throughout the function. That way, if
        # the function recurses, the original value of `release_conn` will be
        # passed down into the recursive call, and its value will be respected.
        #
        # See issue #651 [1] for details.
        #
        # [1] <https://github.com/urllib3/urllib3/issues/651>
        release_this_conn = release_conn

        http_tunnel_required = connection_requires_http_tunnel(
            self.proxy, self.proxy_config, destination_scheme
        )

        # Merge the proxy headers. Only done when not using HTTP CONNECT. We
        # have to copy the headers dict so we can safely change it without those
        # changes being reflected in anyone else's copy.
        if not http_tunnel_required:
            headers = headers.copy()
            headers.update(self.proxy_headers)

        # Must keep the exception bound to a separate variable or else Python 3
        # complains about UnboundLocalError.
        err = None

        # Keep track of whether we cleanly exited the except block. This
        # ensures we do proper cleanup in finally.
        clean_exit = False

        # Rewind body position, if needed. Record current position
        # for future rewinds in the event of a redirect/retry.
        body_pos = set_file_position(body, body_pos)

        try:
            # Request a connection from the queue.
            timeout_obj = self._get_timeout(timeout)
            conn = self._get_conn(timeout=pool_timeout)

            conn.timeout = timeout_obj.connect_timeout

            is_new_proxy_conn = self.proxy is not None and not getattr(
                conn, "sock", None
            )
            if is_new_proxy_conn and http_tunnel_required:
                self._prepare_proxy(conn)

            # Make the request on the httplib connection object.
>           httplib_response = self._make_request(
                conn,
                method,
                url,
                timeout=timeout_obj,
                body=body,
                headers=headers,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\urllib3\connectionpool.py:716:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:416: in _make_request
conn.request(method, url, **httplib_request_kw)
C:\Python311\Lib\site-packages\urllib3\connection.py:244: in request
super(HTTPConnection, self).request(method, url, body=body, headers=headers)
C:\Python311\Lib\http\client.py:1282: in request
self._send_request(method, url, body, headers, encode_chunked)
C:\Python311\Lib\http\client.py:1328: in _send_request
self.endheaders(body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1277: in endheaders
self._send_output(message_body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1037: in _send_output
self.send(msg)
C:\Python311\Lib\http\client.py:975: in send
self.connect()
C:\Python311\Lib\site-packages\urllib3\connection.py:205: in connect
conn = self._new_conn()
^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <urllib3.connection.HTTPConnection object at 0x0000018AA942E9D0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
            conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

        except SocketTimeout:
            raise ConnectTimeoutError(
                self,
                "Connection to %s timed out. (connect timeout=%s)"
                % (self.host, self.timeout),
            )

        except SocketError as e:
>           raise NewConnectionError(
                self, "Failed to establish a new connection: %s" % e
            )
E           urllib3.exceptions.NewConnectionError: <urllib3.connection.HTTPConnection object at 0x0000018AA942E9D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\connection.py:186: NewConnectionError

During handling of the above exception, another exception occurred:

self = <requests.adapters.HTTPAdapter object at 0x0000018AA942C150>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
>           resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\requests\adapters.py:644:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:802: in urlopen
retries = retries.increment(
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = Retry(total=0, connect=None, read=False, redirect=None, status=None), method = 'POST'
url = '/api/v1/appointments/book', response = None
error = NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA942E9D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it')
_pool = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA942C610>
_stacktrace = <traceback object at 0x0000018AA942C740>

    def increment(
        self,
        method=None,
        url=None,
        response=None,
        error=None,
        _pool=None,
        _stacktrace=None,
    ):
        """Return a new Retry object with incremented retry counters.

        :param response: A response object, or None, if the server did not
            return a response.
        :type response: :class:`~urllib3.response.HTTPResponse`
        :param Exception error: An error encountered during the request, or
            None if the response was received successfully.

        :return: A new ``Retry`` object.
        """
        if self.total is False and error:
            # Disabled, indicate to re-raise the error.
            raise six.reraise(type(error), error, _stacktrace)

        total = self.total
        if total is not None:
            total -= 1

        connect = self.connect
        read = self.read
        redirect = self.redirect
        status_count = self.status
        other = self.other
        cause = "unknown"
        status = None
        redirect_location = None

        if error and self._is_connection_error(error):
            # Connect retry?
            if connect is False:
                raise six.reraise(type(error), error, _stacktrace)
            elif connect is not None:
                connect -= 1

        elif error and self._is_read_error(error):
            # Read retry?
            if read is False or not self._is_method_retryable(method):
                raise six.reraise(type(error), error, _stacktrace)
            elif read is not None:
                read -= 1

        elif error:
            # Other retry?
            if other is not None:
                other -= 1

        elif response and response.get_redirect_location():
            # Redirect retry?
            if redirect is not None:
                redirect -= 1
            cause = "too many redirects"
            redirect_location = response.get_redirect_location()
            status = response.status

        else:
            # Incrementing because of a server error like a 500 in
            # status_forcelist and the given method is in the allowed_methods
            cause = ResponseError.GENERIC_ERROR
            if response and response.status:
                if status_count is not None:
                    status_count -= 1
                cause = ResponseError.SPECIFIC_ERROR.format(status_code=response.status)
                status = response.status

        history = self.history + (
            RequestHistory(method, url, error, status, redirect_location),
        )

        new_retry = self.new(
            total=total,
            connect=connect,
            read=read,
            redirect=redirect,
            status=status_count,
            other=other,
            history=history,
        )

        if new_retry.is_exhausted():
>           raise MaxRetryError(_pool, url, error or ResponseError(cause))
E           urllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA942E9D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\urllib3\util\retry.py:594: MaxRetryError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentBooking object at 0x0000018AA8C59BD0>

    def test_idempotent_booking(self):
        """Submitting the same booking twice should not create a duplicate.
        Second request should return the same confirmation, not an error."""
        idempotent_date = _next_weekday(min_days_ahead=500)

        booking = {
            "patient_id": "P001",
            "dentist_id": "D002",
            "appointment_date": idempotent_date,
            "appointment_time": "15:30",
            "reason": "Idempotency test"
        }

>       first = requests.post(f"{BASE_URL}/appointments/book", json=booking)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

test_requirements.py:252:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\requests\api.py:115: in post
return request("post", url, data=data, json=json, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\api.py:59: in request
return session.request(method=method, url=url, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:589: in request
resp = self.send(prep, **send_kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:703: in send
r = adapter.send(request, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <requests.adapters.HTTPAdapter object at 0x0000018AA942C150>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

>           raise ConnectionError(e, request=request)
E           requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA942E9D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\requests\adapters.py:677: ConnectionError
______________________________ TestAppointmentBooking.test_malformed_request_returns_400 ______________________________

self = <urllib3.connection.HTTPConnection object at 0x0000018AA8B8C190>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
>           conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

C:\Python311\Lib\site-packages\urllib3\connection.py:174:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\util\connection.py:95: in create_connection
raise err
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

address = ('localhost', 3000), timeout = None, source_address = None, socket_options = [(6, 1, 1)]

    def create_connection(
        address,
        timeout=socket._GLOBAL_DEFAULT_TIMEOUT,
        source_address=None,
        socket_options=None,
    ):
        """Connect to *address* and return the socket object.

        Convenience function.  Connect to *address* (a 2-tuple ``(host,
        port)``) and return the socket object.  Passing the optional
        *timeout* parameter will set the timeout on the socket instance
        before attempting to connect.  If no *timeout* is supplied, the
        global default timeout setting returned by :func:`socket.getdefaulttimeout`
        is used.  If *source_address* is set it must be a tuple of (host, port)
        for the socket to bind as a source address before making the connection.
        An host of '' or port 0 tells the OS to use the default.
        """

        host, port = address
        if host.startswith("["):
            host = host.strip("[]")
        err = None

        # Using the value from allowed_gai_family() in the context of getaddrinfo lets
        # us select whether to work with IPv4 DNS records, IPv6 records, or both.
        # The original create_connection function always returns all records.
        family = allowed_gai_family()

        try:
            host.encode("idna")
        except UnicodeError:
            return six.raise_from(
                LocationParseError(u"'%s', label empty or too long" % host), None
            )

        for res in socket.getaddrinfo(host, port, family, socket.SOCK_STREAM):
            af, socktype, proto, canonname, sa = res
            sock = None
            try:
                sock = socket.socket(af, socktype, proto)

                # If provided, set socket level options before connecting.
                _set_socket_options(sock, socket_options)

                if timeout is not socket._GLOBAL_DEFAULT_TIMEOUT:
                    sock.settimeout(timeout)
                if source_address:
                    sock.bind(source_address)
>               sock.connect(sa)
E               ConnectionRefusedError: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\util\connection.py:85: ConnectionRefusedError

During handling of the above exception, another exception occurred:

self = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA8B8DE90>, method = 'POST'
url = '/api/v1/appointments/book', body = b'{}'
headers = {'User-Agent': 'python-requests/2.32.5', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Content-Length': '2', 'Content-Type': 'application/json'}
retries = Retry(total=0, connect=None, read=False, redirect=None, status=None), redirect = False
assert_same_host = False, timeout = Timeout(connect=None, read=None, total=None), pool_timeout = None
release_conn = False, chunked = False, body_pos = None
response_kw = {'decode_content': False, 'preload_content': False}
parsed_url = Url(scheme=None, auth=None, host=None, port=None, path='/api/v1/appointments/book', query=None, fragment=None)
destination_scheme = None, conn = None, release_this_conn = True, http_tunnel_required = False, err = None
clean_exit = False

    def urlopen(
        self,
        method,
        url,
        body=None,
        headers=None,
        retries=None,
        redirect=True,
        assert_same_host=True,
        timeout=_Default,
        pool_timeout=None,
        release_conn=None,
        chunked=False,
        body_pos=None,
        **response_kw
    ):
        """
        Get a connection from the pool and perform an HTTP request. This is the
        lowest level call for making a request, so you'll need to specify all
        the raw details.

        .. note::

           More commonly, it's appropriate to use a convenience method provided
           by :class:`.RequestMethods`, such as :meth:`request`.

        .. note::

           `release_conn` will only behave as expected if
           `preload_content=False` because we want to make
           `preload_content=False` the default behaviour someday soon without
           breaking backwards compatibility.

        :param method:
            HTTP request method (such as GET, POST, PUT, etc.)

        :param url:
            The URL to perform the request on.

        :param body:
            Data to send in the request body, either :class:`str`, :class:`bytes`,
            an iterable of :class:`str`/:class:`bytes`, or a file-like object.

        :param headers:
            Dictionary of custom headers to send, such as User-Agent,
            If-None-Match, etc. If None, pool headers are used. If provided,
            these headers completely replace any pool-specific headers.

        :param retries:
            Configure the number of retries to allow before raising a
            :class:`~urllib3.exceptions.MaxRetryError` exception.

            Pass ``None`` to retry until you receive a response. Pass a
            :class:`~urllib3.util.retry.Retry` object for fine-grained control
            over different types of retries.
            Pass an integer number to retry connection errors that many times,
            but no other types of errors. Pass zero to never retry.

            If ``False``, then retries are disabled and any exception is raised
            immediately. Also, instead of raising a MaxRetryError on redirects,
            the redirect response will be returned.

        :type retries: :class:`~urllib3.util.retry.Retry`, False, or an int.

        :param redirect:
            If True, automatically handle redirects (status codes 301, 302,
            303, 307, 308). Each redirect counts as a retry. Disabling retries
            will disable redirect, too.

        :param assert_same_host:
            If ``True``, will make sure that the host of the pool requests is
            consistent else will raise HostChangedError. When ``False``, you can
            use the pool on an HTTP proxy and request foreign hosts.

        :param timeout:
            If specified, overrides the default timeout for this one
            request. It may be a float (in seconds) or an instance of
            :class:`urllib3.util.Timeout`.

        :param pool_timeout:
            If set and the pool is set to block=True, then this method will
            block for ``pool_timeout`` seconds and raise EmptyPoolError if no
            connection is available within the time period.

        :param release_conn:
            If False, then the urlopen call will not release the connection
            back into the pool once a response is received (but will release if
            you read the entire contents of the response such as when
            `preload_content=True`). This is useful if you're not preloading
            the response's content immediately. You will need to call
            ``r.release_conn()`` on the response ``r`` to return the connection
            back into the pool. If None, it takes the value of
            ``response_kw.get('preload_content', True)``.

        :param chunked:
            If True, urllib3 will send the body using chunked transfer
            encoding. Otherwise, urllib3 will send the body using the standard
            content-length form. Defaults to False.

        :param int body_pos:
            Position to seek to in file-like body in the event of a retry or
            redirect. Typically this won't need to be set because urllib3 will
            auto-populate the value when needed.

        :param \\**response_kw:
            Additional parameters are passed to
            :meth:`urllib3.response.HTTPResponse.from_httplib`
        """

        parsed_url = parse_url(url)
        destination_scheme = parsed_url.scheme

        if headers is None:
            headers = self.headers

        if not isinstance(retries, Retry):
            retries = Retry.from_int(retries, redirect=redirect, default=self.retries)

        if release_conn is None:
            release_conn = response_kw.get("preload_content", True)

        # Check host
        if assert_same_host and not self.is_same_host(url):
            raise HostChangedError(self, url, retries)

        # Ensure that the URL we're connecting to is properly encoded
        if url.startswith("/"):
            url = six.ensure_str(_encode_target(url))
        else:
            url = six.ensure_str(parsed_url.url)

        conn = None

        # Track whether `conn` needs to be released before
        # returning/raising/recursing. Update this variable if necessary, and
        # leave `release_conn` constant throughout the function. That way, if
        # the function recurses, the original value of `release_conn` will be
        # passed down into the recursive call, and its value will be respected.
        #
        # See issue #651 [1] for details.
        #
        # [1] <https://github.com/urllib3/urllib3/issues/651>
        release_this_conn = release_conn

        http_tunnel_required = connection_requires_http_tunnel(
            self.proxy, self.proxy_config, destination_scheme
        )

        # Merge the proxy headers. Only done when not using HTTP CONNECT. We
        # have to copy the headers dict so we can safely change it without those
        # changes being reflected in anyone else's copy.
        if not http_tunnel_required:
            headers = headers.copy()
            headers.update(self.proxy_headers)

        # Must keep the exception bound to a separate variable or else Python 3
        # complains about UnboundLocalError.
        err = None

        # Keep track of whether we cleanly exited the except block. This
        # ensures we do proper cleanup in finally.
        clean_exit = False

        # Rewind body position, if needed. Record current position
        # for future rewinds in the event of a redirect/retry.
        body_pos = set_file_position(body, body_pos)

        try:
            # Request a connection from the queue.
            timeout_obj = self._get_timeout(timeout)
            conn = self._get_conn(timeout=pool_timeout)

            conn.timeout = timeout_obj.connect_timeout

            is_new_proxy_conn = self.proxy is not None and not getattr(
                conn, "sock", None
            )
            if is_new_proxy_conn and http_tunnel_required:
                self._prepare_proxy(conn)

            # Make the request on the httplib connection object.
>           httplib_response = self._make_request(
                conn,
                method,
                url,
                timeout=timeout_obj,
                body=body,
                headers=headers,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\urllib3\connectionpool.py:716:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:416: in _make_request
conn.request(method, url, **httplib_request_kw)
C:\Python311\Lib\site-packages\urllib3\connection.py:244: in request
super(HTTPConnection, self).request(method, url, body=body, headers=headers)
C:\Python311\Lib\http\client.py:1282: in request
self._send_request(method, url, body, headers, encode_chunked)
C:\Python311\Lib\http\client.py:1328: in _send_request
self.endheaders(body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1277: in endheaders
self._send_output(message_body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1037: in _send_output
self.send(msg)
C:\Python311\Lib\http\client.py:975: in send
self.connect()
C:\Python311\Lib\site-packages\urllib3\connection.py:205: in connect
conn = self._new_conn()
^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <urllib3.connection.HTTPConnection object at 0x0000018AA8B8C190>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
            conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

        except SocketTimeout:
            raise ConnectTimeoutError(
                self,
                "Connection to %s timed out. (connect timeout=%s)"
                % (self.host, self.timeout),
            )

        except SocketError as e:
>           raise NewConnectionError(
                self, "Failed to establish a new connection: %s" % e
            )
E           urllib3.exceptions.NewConnectionError: <urllib3.connection.HTTPConnection object at 0x0000018AA8B8C190>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\connection.py:186: NewConnectionError

During handling of the above exception, another exception occurred:

self = <requests.adapters.HTTPAdapter object at 0x0000018AA8B8F110>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
>           resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\requests\adapters.py:644:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:802: in urlopen
retries = retries.increment(
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = Retry(total=0, connect=None, read=False, redirect=None, status=None), method = 'POST'
url = '/api/v1/appointments/book', response = None
error = NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA8B8C190>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it')
_pool = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA8B8DE90>
_stacktrace = <traceback object at 0x0000018AA909B840>

    def increment(
        self,
        method=None,
        url=None,
        response=None,
        error=None,
        _pool=None,
        _stacktrace=None,
    ):
        """Return a new Retry object with incremented retry counters.

        :param response: A response object, or None, if the server did not
            return a response.
        :type response: :class:`~urllib3.response.HTTPResponse`
        :param Exception error: An error encountered during the request, or
            None if the response was received successfully.

        :return: A new ``Retry`` object.
        """
        if self.total is False and error:
            # Disabled, indicate to re-raise the error.
            raise six.reraise(type(error), error, _stacktrace)

        total = self.total
        if total is not None:
            total -= 1

        connect = self.connect
        read = self.read
        redirect = self.redirect
        status_count = self.status
        other = self.other
        cause = "unknown"
        status = None
        redirect_location = None

        if error and self._is_connection_error(error):
            # Connect retry?
            if connect is False:
                raise six.reraise(type(error), error, _stacktrace)
            elif connect is not None:
                connect -= 1

        elif error and self._is_read_error(error):
            # Read retry?
            if read is False or not self._is_method_retryable(method):
                raise six.reraise(type(error), error, _stacktrace)
            elif read is not None:
                read -= 1

        elif error:
            # Other retry?
            if other is not None:
                other -= 1

        elif response and response.get_redirect_location():
            # Redirect retry?
            if redirect is not None:
                redirect -= 1
            cause = "too many redirects"
            redirect_location = response.get_redirect_location()
            status = response.status

        else:
            # Incrementing because of a server error like a 500 in
            # status_forcelist and the given method is in the allowed_methods
            cause = ResponseError.GENERIC_ERROR
            if response and response.status:
                if status_count is not None:
                    status_count -= 1
                cause = ResponseError.SPECIFIC_ERROR.format(status_code=response.status)
                status = response.status

        history = self.history + (
            RequestHistory(method, url, error, status, redirect_location),
        )

        new_retry = self.new(
            total=total,
            connect=connect,
            read=read,
            redirect=redirect,
            status=status_count,
            other=other,
            history=history,
        )

        if new_retry.is_exhausted():
>           raise MaxRetryError(_pool, url, error or ResponseError(cause))
E           urllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA8B8C190>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\urllib3\util\retry.py:594: MaxRetryError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentBooking object at 0x0000018AA8C59F10>

    def test_malformed_request_returns_400(self):
        """Sending incomplete or empty booking data should return 400"""
>       response = requests.post(f"{BASE_URL}/appointments/book", json={})
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

test_requirements.py:270:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\requests\api.py:115: in post
return request("post", url, data=data, json=json, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\api.py:59: in request
return session.request(method=method, url=url, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:589: in request
resp = self.send(prep, **send_kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:703: in send
r = adapter.send(request, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <requests.adapters.HTTPAdapter object at 0x0000018AA8B8F110>, request = <PreparedRequest [POST]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

>           raise ConnectionError(e, request=request)
E           requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/appointments/book (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA8B8C190>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\requests\adapters.py:677: ConnectionError
_______________________________ TestResilience.test_api_stays_up_under_legacy_failures ________________________________

self = <urllib3.connection.HTTPConnection object at 0x0000018AA9235250>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
>           conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

C:\Python311\Lib\site-packages\urllib3\connection.py:174:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\util\connection.py:95: in create_connection
raise err
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

address = ('localhost', 3000), timeout = None, source_address = None, socket_options = [(6, 1, 1)]

    def create_connection(
        address,
        timeout=socket._GLOBAL_DEFAULT_TIMEOUT,
        source_address=None,
        socket_options=None,
    ):
        """Connect to *address* and return the socket object.

        Convenience function.  Connect to *address* (a 2-tuple ``(host,
        port)``) and return the socket object.  Passing the optional
        *timeout* parameter will set the timeout on the socket instance
        before attempting to connect.  If no *timeout* is supplied, the
        global default timeout setting returned by :func:`socket.getdefaulttimeout`
        is used.  If *source_address* is set it must be a tuple of (host, port)
        for the socket to bind as a source address before making the connection.
        An host of '' or port 0 tells the OS to use the default.
        """

        host, port = address
        if host.startswith("["):
            host = host.strip("[]")
        err = None

        # Using the value from allowed_gai_family() in the context of getaddrinfo lets
        # us select whether to work with IPv4 DNS records, IPv6 records, or both.
        # The original create_connection function always returns all records.
        family = allowed_gai_family()

        try:
            host.encode("idna")
        except UnicodeError:
            return six.raise_from(
                LocationParseError(u"'%s', label empty or too long" % host), None
            )

        for res in socket.getaddrinfo(host, port, family, socket.SOCK_STREAM):
            af, socktype, proto, canonname, sa = res
            sock = None
            try:
                sock = socket.socket(af, socktype, proto)

                # If provided, set socket level options before connecting.
                _set_socket_options(sock, socket_options)

                if timeout is not socket._GLOBAL_DEFAULT_TIMEOUT:
                    sock.settimeout(timeout)
                if source_address:
                    sock.bind(source_address)
>               sock.connect(sa)
E               ConnectionRefusedError: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\util\connection.py:85: ConnectionRefusedError

During handling of the above exception, another exception occurred:

self = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA9237450>, method = 'GET'
url = '/api/v1/patients/5551234567', body = None
headers = {'User-Agent': 'python-requests/2.32.5', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
retries = Retry(total=0, connect=None, read=False, redirect=None, status=None), redirect = False
assert_same_host = False, timeout = Timeout(connect=None, read=None, total=None), pool_timeout = None
release_conn = False, chunked = False, body_pos = None
response_kw = {'decode_content': False, 'preload_content': False}
parsed_url = Url(scheme=None, auth=None, host=None, port=None, path='/api/v1/patients/5551234567', query=None, fragment=None)
destination_scheme = None, conn = None, release_this_conn = True, http_tunnel_required = False, err = None
clean_exit = False

    def urlopen(
        self,
        method,
        url,
        body=None,
        headers=None,
        retries=None,
        redirect=True,
        assert_same_host=True,
        timeout=_Default,
        pool_timeout=None,
        release_conn=None,
        chunked=False,
        body_pos=None,
        **response_kw
    ):
        """
        Get a connection from the pool and perform an HTTP request. This is the
        lowest level call for making a request, so you'll need to specify all
        the raw details.

        .. note::

           More commonly, it's appropriate to use a convenience method provided
           by :class:`.RequestMethods`, such as :meth:`request`.

        .. note::

           `release_conn` will only behave as expected if
           `preload_content=False` because we want to make
           `preload_content=False` the default behaviour someday soon without
           breaking backwards compatibility.

        :param method:
            HTTP request method (such as GET, POST, PUT, etc.)

        :param url:
            The URL to perform the request on.

        :param body:
            Data to send in the request body, either :class:`str`, :class:`bytes`,
            an iterable of :class:`str`/:class:`bytes`, or a file-like object.

        :param headers:
            Dictionary of custom headers to send, such as User-Agent,
            If-None-Match, etc. If None, pool headers are used. If provided,
            these headers completely replace any pool-specific headers.

        :param retries:
            Configure the number of retries to allow before raising a
            :class:`~urllib3.exceptions.MaxRetryError` exception.

            Pass ``None`` to retry until you receive a response. Pass a
            :class:`~urllib3.util.retry.Retry` object for fine-grained control
            over different types of retries.
            Pass an integer number to retry connection errors that many times,
            but no other types of errors. Pass zero to never retry.

            If ``False``, then retries are disabled and any exception is raised
            immediately. Also, instead of raising a MaxRetryError on redirects,
            the redirect response will be returned.

        :type retries: :class:`~urllib3.util.retry.Retry`, False, or an int.

        :param redirect:
            If True, automatically handle redirects (status codes 301, 302,
            303, 307, 308). Each redirect counts as a retry. Disabling retries
            will disable redirect, too.

        :param assert_same_host:
            If ``True``, will make sure that the host of the pool requests is
            consistent else will raise HostChangedError. When ``False``, you can
            use the pool on an HTTP proxy and request foreign hosts.

        :param timeout:
            If specified, overrides the default timeout for this one
            request. It may be a float (in seconds) or an instance of
            :class:`urllib3.util.Timeout`.

        :param pool_timeout:
            If set and the pool is set to block=True, then this method will
            block for ``pool_timeout`` seconds and raise EmptyPoolError if no
            connection is available within the time period.

        :param release_conn:
            If False, then the urlopen call will not release the connection
            back into the pool once a response is received (but will release if
            you read the entire contents of the response such as when
            `preload_content=True`). This is useful if you're not preloading
            the response's content immediately. You will need to call
            ``r.release_conn()`` on the response ``r`` to return the connection
            back into the pool. If None, it takes the value of
            ``response_kw.get('preload_content', True)``.

        :param chunked:
            If True, urllib3 will send the body using chunked transfer
            encoding. Otherwise, urllib3 will send the body using the standard
            content-length form. Defaults to False.

        :param int body_pos:
            Position to seek to in file-like body in the event of a retry or
            redirect. Typically this won't need to be set because urllib3 will
            auto-populate the value when needed.

        :param \\**response_kw:
            Additional parameters are passed to
            :meth:`urllib3.response.HTTPResponse.from_httplib`
        """

        parsed_url = parse_url(url)
        destination_scheme = parsed_url.scheme

        if headers is None:
            headers = self.headers

        if not isinstance(retries, Retry):
            retries = Retry.from_int(retries, redirect=redirect, default=self.retries)

        if release_conn is None:
            release_conn = response_kw.get("preload_content", True)

        # Check host
        if assert_same_host and not self.is_same_host(url):
            raise HostChangedError(self, url, retries)

        # Ensure that the URL we're connecting to is properly encoded
        if url.startswith("/"):
            url = six.ensure_str(_encode_target(url))
        else:
            url = six.ensure_str(parsed_url.url)

        conn = None

        # Track whether `conn` needs to be released before
        # returning/raising/recursing. Update this variable if necessary, and
        # leave `release_conn` constant throughout the function. That way, if
        # the function recurses, the original value of `release_conn` will be
        # passed down into the recursive call, and its value will be respected.
        #
        # See issue #651 [1] for details.
        #
        # [1] <https://github.com/urllib3/urllib3/issues/651>
        release_this_conn = release_conn

        http_tunnel_required = connection_requires_http_tunnel(
            self.proxy, self.proxy_config, destination_scheme
        )

        # Merge the proxy headers. Only done when not using HTTP CONNECT. We
        # have to copy the headers dict so we can safely change it without those
        # changes being reflected in anyone else's copy.
        if not http_tunnel_required:
            headers = headers.copy()
            headers.update(self.proxy_headers)

        # Must keep the exception bound to a separate variable or else Python 3
        # complains about UnboundLocalError.
        err = None

        # Keep track of whether we cleanly exited the except block. This
        # ensures we do proper cleanup in finally.
        clean_exit = False

        # Rewind body position, if needed. Record current position
        # for future rewinds in the event of a redirect/retry.
        body_pos = set_file_position(body, body_pos)

        try:
            # Request a connection from the queue.
            timeout_obj = self._get_timeout(timeout)
            conn = self._get_conn(timeout=pool_timeout)

            conn.timeout = timeout_obj.connect_timeout

            is_new_proxy_conn = self.proxy is not None and not getattr(
                conn, "sock", None
            )
            if is_new_proxy_conn and http_tunnel_required:
                self._prepare_proxy(conn)

            # Make the request on the httplib connection object.
>           httplib_response = self._make_request(
                conn,
                method,
                url,
                timeout=timeout_obj,
                body=body,
                headers=headers,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\urllib3\connectionpool.py:716:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:416: in _make_request
conn.request(method, url, **httplib_request_kw)
C:\Python311\Lib\site-packages\urllib3\connection.py:244: in request
super(HTTPConnection, self).request(method, url, body=body, headers=headers)
C:\Python311\Lib\http\client.py:1282: in request
self._send_request(method, url, body, headers, encode_chunked)
C:\Python311\Lib\http\client.py:1328: in _send_request
self.endheaders(body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1277: in endheaders
self._send_output(message_body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1037: in _send_output
self.send(msg)
C:\Python311\Lib\http\client.py:975: in send
self.connect()
C:\Python311\Lib\site-packages\urllib3\connection.py:205: in connect
conn = self._new_conn()
^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <urllib3.connection.HTTPConnection object at 0x0000018AA9235250>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
            conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

        except SocketTimeout:
            raise ConnectTimeoutError(
                self,
                "Connection to %s timed out. (connect timeout=%s)"
                % (self.host, self.timeout),
            )

        except SocketError as e:
>           raise NewConnectionError(
                self, "Failed to establish a new connection: %s" % e
            )
E           urllib3.exceptions.NewConnectionError: <urllib3.connection.HTTPConnection object at 0x0000018AA9235250>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\connection.py:186: NewConnectionError

During handling of the above exception, another exception occurred:

self = <requests.adapters.HTTPAdapter object at 0x0000018AA9234090>, request = <PreparedRequest [GET]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
>           resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\requests\adapters.py:644:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:802: in urlopen
retries = retries.increment(
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = Retry(total=0, connect=None, read=False, redirect=None, status=None), method = 'GET'
url = '/api/v1/patients/5551234567', response = None
error = NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA9235250>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it')
_pool = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA9237450>
_stacktrace = <traceback object at 0x0000018AA9277680>

    def increment(
        self,
        method=None,
        url=None,
        response=None,
        error=None,
        _pool=None,
        _stacktrace=None,
    ):
        """Return a new Retry object with incremented retry counters.

        :param response: A response object, or None, if the server did not
            return a response.
        :type response: :class:`~urllib3.response.HTTPResponse`
        :param Exception error: An error encountered during the request, or
            None if the response was received successfully.

        :return: A new ``Retry`` object.
        """
        if self.total is False and error:
            # Disabled, indicate to re-raise the error.
            raise six.reraise(type(error), error, _stacktrace)

        total = self.total
        if total is not None:
            total -= 1

        connect = self.connect
        read = self.read
        redirect = self.redirect
        status_count = self.status
        other = self.other
        cause = "unknown"
        status = None
        redirect_location = None

        if error and self._is_connection_error(error):
            # Connect retry?
            if connect is False:
                raise six.reraise(type(error), error, _stacktrace)
            elif connect is not None:
                connect -= 1

        elif error and self._is_read_error(error):
            # Read retry?
            if read is False or not self._is_method_retryable(method):
                raise six.reraise(type(error), error, _stacktrace)
            elif read is not None:
                read -= 1

        elif error:
            # Other retry?
            if other is not None:
                other -= 1

        elif response and response.get_redirect_location():
            # Redirect retry?
            if redirect is not None:
                redirect -= 1
            cause = "too many redirects"
            redirect_location = response.get_redirect_location()
            status = response.status

        else:
            # Incrementing because of a server error like a 500 in
            # status_forcelist and the given method is in the allowed_methods
            cause = ResponseError.GENERIC_ERROR
            if response and response.status:
                if status_count is not None:
                    status_count -= 1
                cause = ResponseError.SPECIFIC_ERROR.format(status_code=response.status)
                status = response.status

        history = self.history + (
            RequestHistory(method, url, error, status, redirect_location),
        )

        new_retry = self.new(
            total=total,
            connect=connect,
            read=read,
            redirect=redirect,
            status=status_count,
            other=other,
            history=history,
        )

        if new_retry.is_exhausted():
>           raise MaxRetryError(_pool, url, error or ResponseError(cause))
E           urllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/patients/5551234567 (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA9235250>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\urllib3\util\retry.py:594: MaxRetryError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestResilience object at 0x0000018AA8C5A5D0>

    def test_api_stays_up_under_legacy_failures(self):
        """Legacy API fails randomly — your wrapper should handle it gracefully"""
        results = []
        for _ in range(10):
>           r = requests.get(f"{BASE_URL}/patients/5551234567")
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

test_requirements.py:288:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\requests\api.py:73: in get
return request("get", url, params=params, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\api.py:59: in request
return session.request(method=method, url=url, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:589: in request
resp = self.send(prep, **send_kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:703: in send
r = adapter.send(request, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <requests.adapters.HTTPAdapter object at 0x0000018AA9234090>, request = <PreparedRequest [GET]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

>           raise ConnectionError(e, request=request)
E           requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/patients/5551234567 (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA9235250>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\requests\adapters.py:677: ConnectionError
_________________________________________ TestResilience.test_errors_are_json _________________________________________

self = <urllib3.connection.HTTPConnection object at 0x0000018AA93419D0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
>           conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

C:\Python311\Lib\site-packages\urllib3\connection.py:174:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\util\connection.py:95: in create_connection
raise err
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

address = ('localhost', 3000), timeout = None, source_address = None, socket_options = [(6, 1, 1)]

    def create_connection(
        address,
        timeout=socket._GLOBAL_DEFAULT_TIMEOUT,
        source_address=None,
        socket_options=None,
    ):
        """Connect to *address* and return the socket object.

        Convenience function.  Connect to *address* (a 2-tuple ``(host,
        port)``) and return the socket object.  Passing the optional
        *timeout* parameter will set the timeout on the socket instance
        before attempting to connect.  If no *timeout* is supplied, the
        global default timeout setting returned by :func:`socket.getdefaulttimeout`
        is used.  If *source_address* is set it must be a tuple of (host, port)
        for the socket to bind as a source address before making the connection.
        An host of '' or port 0 tells the OS to use the default.
        """

        host, port = address
        if host.startswith("["):
            host = host.strip("[]")
        err = None

        # Using the value from allowed_gai_family() in the context of getaddrinfo lets
        # us select whether to work with IPv4 DNS records, IPv6 records, or both.
        # The original create_connection function always returns all records.
        family = allowed_gai_family()

        try:
            host.encode("idna")
        except UnicodeError:
            return six.raise_from(
                LocationParseError(u"'%s', label empty or too long" % host), None
            )

        for res in socket.getaddrinfo(host, port, family, socket.SOCK_STREAM):
            af, socktype, proto, canonname, sa = res
            sock = None
            try:
                sock = socket.socket(af, socktype, proto)

                # If provided, set socket level options before connecting.
                _set_socket_options(sock, socket_options)

                if timeout is not socket._GLOBAL_DEFAULT_TIMEOUT:
                    sock.settimeout(timeout)
                if source_address:
                    sock.bind(source_address)
>               sock.connect(sa)
E               ConnectionRefusedError: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\util\connection.py:85: ConnectionRefusedError

During handling of the above exception, another exception occurred:

self = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA93428D0>, method = 'GET'
url = '/api/v1/patients/9999999999', body = None
headers = {'User-Agent': 'python-requests/2.32.5', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
retries = Retry(total=0, connect=None, read=False, redirect=None, status=None), redirect = False
assert_same_host = False, timeout = Timeout(connect=None, read=None, total=None), pool_timeout = None
release_conn = False, chunked = False, body_pos = None
response_kw = {'decode_content': False, 'preload_content': False}
parsed_url = Url(scheme=None, auth=None, host=None, port=None, path='/api/v1/patients/9999999999', query=None, fragment=None)
destination_scheme = None, conn = None, release_this_conn = True, http_tunnel_required = False, err = None
clean_exit = False

    def urlopen(
        self,
        method,
        url,
        body=None,
        headers=None,
        retries=None,
        redirect=True,
        assert_same_host=True,
        timeout=_Default,
        pool_timeout=None,
        release_conn=None,
        chunked=False,
        body_pos=None,
        **response_kw
    ):
        """
        Get a connection from the pool and perform an HTTP request. This is the
        lowest level call for making a request, so you'll need to specify all
        the raw details.

        .. note::

           More commonly, it's appropriate to use a convenience method provided
           by :class:`.RequestMethods`, such as :meth:`request`.

        .. note::

           `release_conn` will only behave as expected if
           `preload_content=False` because we want to make
           `preload_content=False` the default behaviour someday soon without
           breaking backwards compatibility.

        :param method:
            HTTP request method (such as GET, POST, PUT, etc.)

        :param url:
            The URL to perform the request on.

        :param body:
            Data to send in the request body, either :class:`str`, :class:`bytes`,
            an iterable of :class:`str`/:class:`bytes`, or a file-like object.

        :param headers:
            Dictionary of custom headers to send, such as User-Agent,
            If-None-Match, etc. If None, pool headers are used. If provided,
            these headers completely replace any pool-specific headers.

        :param retries:
            Configure the number of retries to allow before raising a
            :class:`~urllib3.exceptions.MaxRetryError` exception.

            Pass ``None`` to retry until you receive a response. Pass a
            :class:`~urllib3.util.retry.Retry` object for fine-grained control
            over different types of retries.
            Pass an integer number to retry connection errors that many times,
            but no other types of errors. Pass zero to never retry.

            If ``False``, then retries are disabled and any exception is raised
            immediately. Also, instead of raising a MaxRetryError on redirects,
            the redirect response will be returned.

        :type retries: :class:`~urllib3.util.retry.Retry`, False, or an int.

        :param redirect:
            If True, automatically handle redirects (status codes 301, 302,
            303, 307, 308). Each redirect counts as a retry. Disabling retries
            will disable redirect, too.

        :param assert_same_host:
            If ``True``, will make sure that the host of the pool requests is
            consistent else will raise HostChangedError. When ``False``, you can
            use the pool on an HTTP proxy and request foreign hosts.

        :param timeout:
            If specified, overrides the default timeout for this one
            request. It may be a float (in seconds) or an instance of
            :class:`urllib3.util.Timeout`.

        :param pool_timeout:
            If set and the pool is set to block=True, then this method will
            block for ``pool_timeout`` seconds and raise EmptyPoolError if no
            connection is available within the time period.

        :param release_conn:
            If False, then the urlopen call will not release the connection
            back into the pool once a response is received (but will release if
            you read the entire contents of the response such as when
            `preload_content=True`). This is useful if you're not preloading
            the response's content immediately. You will need to call
            ``r.release_conn()`` on the response ``r`` to return the connection
            back into the pool. If None, it takes the value of
            ``response_kw.get('preload_content', True)``.

        :param chunked:
            If True, urllib3 will send the body using chunked transfer
            encoding. Otherwise, urllib3 will send the body using the standard
            content-length form. Defaults to False.

        :param int body_pos:
            Position to seek to in file-like body in the event of a retry or
            redirect. Typically this won't need to be set because urllib3 will
            auto-populate the value when needed.

        :param \\**response_kw:
            Additional parameters are passed to
            :meth:`urllib3.response.HTTPResponse.from_httplib`
        """

        parsed_url = parse_url(url)
        destination_scheme = parsed_url.scheme

        if headers is None:
            headers = self.headers

        if not isinstance(retries, Retry):
            retries = Retry.from_int(retries, redirect=redirect, default=self.retries)

        if release_conn is None:
            release_conn = response_kw.get("preload_content", True)

        # Check host
        if assert_same_host and not self.is_same_host(url):
            raise HostChangedError(self, url, retries)

        # Ensure that the URL we're connecting to is properly encoded
        if url.startswith("/"):
            url = six.ensure_str(_encode_target(url))
        else:
            url = six.ensure_str(parsed_url.url)

        conn = None

        # Track whether `conn` needs to be released before
        # returning/raising/recursing. Update this variable if necessary, and
        # leave `release_conn` constant throughout the function. That way, if
        # the function recurses, the original value of `release_conn` will be
        # passed down into the recursive call, and its value will be respected.
        #
        # See issue #651 [1] for details.
        #
        # [1] <https://github.com/urllib3/urllib3/issues/651>
        release_this_conn = release_conn

        http_tunnel_required = connection_requires_http_tunnel(
            self.proxy, self.proxy_config, destination_scheme
        )

        # Merge the proxy headers. Only done when not using HTTP CONNECT. We
        # have to copy the headers dict so we can safely change it without those
        # changes being reflected in anyone else's copy.
        if not http_tunnel_required:
            headers = headers.copy()
            headers.update(self.proxy_headers)

        # Must keep the exception bound to a separate variable or else Python 3
        # complains about UnboundLocalError.
        err = None

        # Keep track of whether we cleanly exited the except block. This
        # ensures we do proper cleanup in finally.
        clean_exit = False

        # Rewind body position, if needed. Record current position
        # for future rewinds in the event of a redirect/retry.
        body_pos = set_file_position(body, body_pos)

        try:
            # Request a connection from the queue.
            timeout_obj = self._get_timeout(timeout)
            conn = self._get_conn(timeout=pool_timeout)

            conn.timeout = timeout_obj.connect_timeout

            is_new_proxy_conn = self.proxy is not None and not getattr(
                conn, "sock", None
            )
            if is_new_proxy_conn and http_tunnel_required:
                self._prepare_proxy(conn)

            # Make the request on the httplib connection object.
>           httplib_response = self._make_request(
                conn,
                method,
                url,
                timeout=timeout_obj,
                body=body,
                headers=headers,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\urllib3\connectionpool.py:716:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:416: in _make_request
conn.request(method, url, **httplib_request_kw)
C:\Python311\Lib\site-packages\urllib3\connection.py:244: in request
super(HTTPConnection, self).request(method, url, body=body, headers=headers)
C:\Python311\Lib\http\client.py:1282: in request
self._send_request(method, url, body, headers, encode_chunked)
C:\Python311\Lib\http\client.py:1328: in _send_request
self.endheaders(body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1277: in endheaders
self._send_output(message_body, encode_chunked=encode_chunked)
C:\Python311\Lib\http\client.py:1037: in _send_output
self.send(msg)
C:\Python311\Lib\http\client.py:975: in send
self.connect()
C:\Python311\Lib\site-packages\urllib3\connection.py:205: in connect
conn = self._new_conn()
^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <urllib3.connection.HTTPConnection object at 0x0000018AA93419D0>

    def _new_conn(self):
        """Establish a socket connection and set nodelay settings on it.

        :return: New socket connection.
        """
        extra_kw = {}
        if self.source_address:
            extra_kw["source_address"] = self.source_address

        if self.socket_options:
            extra_kw["socket_options"] = self.socket_options

        try:
            conn = connection.create_connection(
                (self._dns_host, self.port), self.timeout, **extra_kw
            )

        except SocketTimeout:
            raise ConnectTimeoutError(
                self,
                "Connection to %s timed out. (connect timeout=%s)"
                % (self.host, self.timeout),
            )

        except SocketError as e:
>           raise NewConnectionError(
                self, "Failed to establish a new connection: %s" % e
            )
E           urllib3.exceptions.NewConnectionError: <urllib3.connection.HTTPConnection object at 0x0000018AA93419D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it

C:\Python311\Lib\site-packages\urllib3\connection.py:186: NewConnectionError

During handling of the above exception, another exception occurred:

self = <requests.adapters.HTTPAdapter object at 0x0000018AA9340E10>, request = <PreparedRequest [GET]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
>           resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

C:\Python311\Lib\site-packages\requests\adapters.py:644:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\urllib3\connectionpool.py:802: in urlopen
retries = retries.increment(
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = Retry(total=0, connect=None, read=False, redirect=None, status=None), method = 'GET'
url = '/api/v1/patients/9999999999', response = None
error = NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA93419D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it')
_pool = <urllib3.connectionpool.HTTPConnectionPool object at 0x0000018AA93428D0>
_stacktrace = <traceback object at 0x0000018AA93420C0>

    def increment(
        self,
        method=None,
        url=None,
        response=None,
        error=None,
        _pool=None,
        _stacktrace=None,
    ):
        """Return a new Retry object with incremented retry counters.

        :param response: A response object, or None, if the server did not
            return a response.
        :type response: :class:`~urllib3.response.HTTPResponse`
        :param Exception error: An error encountered during the request, or
            None if the response was received successfully.

        :return: A new ``Retry`` object.
        """
        if self.total is False and error:
            # Disabled, indicate to re-raise the error.
            raise six.reraise(type(error), error, _stacktrace)

        total = self.total
        if total is not None:
            total -= 1

        connect = self.connect
        read = self.read
        redirect = self.redirect
        status_count = self.status
        other = self.other
        cause = "unknown"
        status = None
        redirect_location = None

        if error and self._is_connection_error(error):
            # Connect retry?
            if connect is False:
                raise six.reraise(type(error), error, _stacktrace)
            elif connect is not None:
                connect -= 1

        elif error and self._is_read_error(error):
            # Read retry?
            if read is False or not self._is_method_retryable(method):
                raise six.reraise(type(error), error, _stacktrace)
            elif read is not None:
                read -= 1

        elif error:
            # Other retry?
            if other is not None:
                other -= 1

        elif response and response.get_redirect_location():
            # Redirect retry?
            if redirect is not None:
                redirect -= 1
            cause = "too many redirects"
            redirect_location = response.get_redirect_location()
            status = response.status

        else:
            # Incrementing because of a server error like a 500 in
            # status_forcelist and the given method is in the allowed_methods
            cause = ResponseError.GENERIC_ERROR
            if response and response.status:
                if status_count is not None:
                    status_count -= 1
                cause = ResponseError.SPECIFIC_ERROR.format(status_code=response.status)
                status = response.status

        history = self.history + (
            RequestHistory(method, url, error, status, redirect_location),
        )

        new_retry = self.new(
            total=total,
            connect=connect,
            read=read,
            redirect=redirect,
            status=status_count,
            other=other,
            history=history,
        )

        if new_retry.is_exhausted():
>           raise MaxRetryError(_pool, url, error or ResponseError(cause))
E           urllib3.exceptions.MaxRetryError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/patients/9999999999 (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA93419D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\urllib3\util\retry.py:594: MaxRetryError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestResilience object at 0x0000018AA8C5B290>

    def test_errors_are_json(self):
        """Error responses should be JSON, never HTML"""
>       response = requests.get(f"{BASE_URL}/patients/9999999999")
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

test_requirements.py:299:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\requests\api.py:73: in get
return request("get", url, params=params, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\api.py:59: in request
return session.request(method=method, url=url, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:589: in request
resp = self.send(prep, **send_kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\requests\sessions.py:703: in send
r = adapter.send(request, **kwargs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <requests.adapters.HTTPAdapter object at 0x0000018AA9340E10>, request = <PreparedRequest [GET]>, stream = False
timeout = Timeout(connect=None, read=None, total=None), verify = True, cert = None, proxies = OrderedDict()

    def send(
        self, request, stream=False, timeout=None, verify=True, cert=None, proxies=None
    ):
        """Sends PreparedRequest object. Returns Response object.

        :param request: The :class:`PreparedRequest <PreparedRequest>` being sent.
        :param stream: (optional) Whether to stream the request content.
        :param timeout: (optional) How long to wait for the server to send
            data before giving up, as a float, or a :ref:`(connect timeout,
            read timeout) <timeouts>` tuple.
        :type timeout: float or tuple or urllib3 Timeout object
        :param verify: (optional) Either a boolean, in which case it controls whether
            we verify the server's TLS certificate, or a string, in which case it
            must be a path to a CA bundle to use
        :param cert: (optional) Any user-provided SSL certificate to be trusted.
        :param proxies: (optional) The proxies dictionary to apply to the request.
        :rtype: requests.Response
        """

        try:
            conn = self.get_connection_with_tls_context(
                request, verify, proxies=proxies, cert=cert
            )
        except LocationValueError as e:
            raise InvalidURL(e, request=request)

        self.cert_verify(conn, request.url, verify, cert)
        url = self.request_url(request, proxies)
        self.add_headers(
            request,
            stream=stream,
            timeout=timeout,
            verify=verify,
            cert=cert,
            proxies=proxies,
        )

        chunked = not (request.body is None or "Content-Length" in request.headers)

        if isinstance(timeout, tuple):
            try:
                connect, read = timeout
                timeout = TimeoutSauce(connect=connect, read=read)
            except ValueError:
                raise ValueError(
                    f"Invalid timeout {timeout}. Pass a (connect, read) timeout tuple, "
                    f"or a single float to set both timeouts to the same value."
                )
        elif isinstance(timeout, TimeoutSauce):
            pass
        else:
            timeout = TimeoutSauce(connect=timeout, read=timeout)

        try:
            resp = conn.urlopen(
                method=request.method,
                url=url,
                body=request.body,
                headers=request.headers,
                redirect=False,
                assert_same_host=False,
                preload_content=False,
                decode_content=False,
                retries=self.max_retries,
                timeout=timeout,
                chunked=chunked,
            )

        except (ProtocolError, OSError) as err:
            raise ConnectionError(err, request=request)

        except MaxRetryError as e:
            if isinstance(e.reason, ConnectTimeoutError):
                # TODO: Remove this in 3.0.0: see #2811
                if not isinstance(e.reason, NewConnectionError):
                    raise ConnectTimeout(e, request=request)

            if isinstance(e.reason, ResponseError):
                raise RetryError(e, request=request)

            if isinstance(e.reason, _ProxyError):
                raise ProxyError(e, request=request)

            if isinstance(e.reason, _SSLError):
                # This branch is for urllib3 v1.22 and later.
                raise SSLError(e, request=request)

>           raise ConnectionError(e, request=request)
E           requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url: /api/v1/patients/9999999999 (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x0000018AA93419D0>: Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it'))

C:\Python311\Lib\site-packages\requests\adapters.py:677: ConnectionError
=============================================== short test summary info ===============================================
FAILED test_requirements.py::TestPatientLookup::test_patient_found - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestPatientLookup::test_patient_not_found - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestPatientLookup::test_phone_format_handling - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestPatientLookup::test_dates_are_normalized - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestPatientLookup::test_booleans_are_booleans - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestPatientLookup::test_response_time - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentBooking::test_successful_booking - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentBooking::test_nonexistent_patient_returns_404 - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentBooking::test_idempotent_booking - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestResilience::test_api_stays_up_under_legacy_failures - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
FAILED test_requirements.py::TestResilience::test_errors_are_json - requests.exceptions.ConnectionError: HTTPConnectionPool(host='localhost', port=3000): Max retries exceeded with url...
============================================ 20 failed in 88.36s (0:01:28) ============================================

D:\IdeaProjects\kindr_take_home>python test_requirements.py
================================================= test session starts =================================================
platform win32 -- Python 3.11.0, pytest-9.0.2, pluggy-1.6.0 -- C:\Python311\python.exe
cachedir: .pytest_cache
rootdir: D:\IdeaProjects\kindr_take_home
collected 20 items

test_requirements.py::TestPatientLookup::test_patient_found FAILED                                               [  5%]
test_requirements.py::TestPatientLookup::test_patient_not_found FAILED                                           [ 10%]
test_requirements.py::TestPatientLookup::test_phone_format_handling FAILED                                       [ 15%]
test_requirements.py::TestPatientLookup::test_dates_are_normalized FAILED                                        [ 20%]
test_requirements.py::TestPatientLookup::test_booleans_are_booleans FAILED                                       [ 25%]
test_requirements.py::TestPatientLookup::test_response_time PASSED                                               [ 30%]
test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots FAILED                             [ 35%]
test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty FAILED                             [ 40%]
test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots FAILED                                    [ 45%]
test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields FAILED                          [ 50%]
test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist FAILED                                 [ 55%]
test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 FAILED                          [ 60%]
test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability FAILED            [ 65%]
test_requirements.py::TestAppointmentBooking::test_successful_booking FAILED                                     [ 70%]
test_requirements.py::TestAppointmentBooking::test_nonexistent_patient_returns_404 PASSED                        [ 75%]
test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 FAILED                            [ 80%]
test_requirements.py::TestAppointmentBooking::test_idempotent_booking FAILED                                     [ 85%]
test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 FAILED                          [ 90%]
test_requirements.py::TestResilience::test_api_stays_up_under_legacy_failures PASSED                             [ 95%]
test_requirements.py::TestResilience::test_errors_are_json FAILED                                                [100%]

====================================================== FAILURES =======================================================
________________________________________ TestPatientLookup.test_patient_found _________________________________________

self = <Response [200]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000001252BB88910>, s = 'Incoming phone number: 5551234567', idx = 0
_w = <built-in method match of re.Pattern object at 0x000001252CCC6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestPatientLookup object at 0x000001252F28ACD0>

    def test_patient_found(self):
        """Should return patient data for a known phone number"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        assert response.status_code == 200

>       data = response.json()
               ^^^^^^^^^^^^^^^

test_requirements.py:49:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [200]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
______________________________________ TestPatientLookup.test_patient_not_found _______________________________________

self = <test_requirements.TestPatientLookup object at 0x000001252F399250>

    def test_patient_not_found(self):
        """Should return 404 for a phone number with no patient"""
        response = requests.get(f"{BASE_URL}/patients/9999999999")
>       assert response.status_code == 404
E       assert 200 == 404
E        +  where 200 = <Response [200]>.status_code

test_requirements.py:60: AssertionError
____________________________________ TestPatientLookup.test_phone_format_handling _____________________________________

self = <Response [200]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000001252BB88910>, s = 'Incoming phone number: 5551234567', idx = 0
_w = <built-in method match of re.Pattern object at 0x000001252CCC6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestPatientLookup object at 0x000001252F399950>

    def test_phone_format_handling(self):
        """Same patient should be found regardless of phone format"""
        formats = ['5551234567', '(555) 123-4567', '555-123-4567', '+15551234567']
        ids = set()
        for fmt in formats:
            response = requests.get(f"{BASE_URL}/patients/{fmt}")
            assert response.status_code == 200, f"Failed for format: {fmt}"
>           ids.add(response.json()['patient_id'])
                    ^^^^^^^^^^^^^^^

test_requirements.py:69:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [200]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_____________________________________ TestPatientLookup.test_dates_are_normalized _____________________________________

self = <Response [200]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000001252BB88910>, s = 'Incoming phone number: 5551234567', idx = 0
_w = <built-in method match of re.Pattern object at 0x000001252CCC6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestPatientLookup object at 0x000001252F39A090>

    def test_dates_are_normalized(self):
        """All date fields should be YYYY-MM-DD"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
>       data = response.json()
               ^^^^^^^^^^^^^^^

test_requirements.py:76:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [200]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
____________________________________ TestPatientLookup.test_booleans_are_booleans _____________________________________

self = <Response [200]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000001252BB88910>, s = 'Incoming phone number: 5551234567', idx = 0
_w = <built-in method match of re.Pattern object at 0x000001252CCC6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestPatientLookup object at 0x000001252F39A790>

    def test_booleans_are_booleans(self):
        """Insurance status should be a real boolean, not a string"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
>       data = response.json()
               ^^^^^^^^^^^^^^^

test_requirements.py:88:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [200]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_______________________________ TestAppointmentAvailability.test_weekday_returns_slots ________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001252F39B710>

    def test_weekday_returns_slots(self):
        """A weekday should have available slots"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:118: AssertionError
_______________________________ TestAppointmentAvailability.test_weekend_returns_empty ________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001252F39A450>

    def test_weekend_returns_empty(self):
        """Weekends should return no available slots"""
        saturday = _next_weekend()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': saturday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:131: AssertionError
___________________________________ TestAppointmentAvailability.test_no_lunch_slots ___________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000001252BB88910>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x000001252CCC6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x000001252F39BBD0>

    def test_no_lunch_slots(self):
        """No slots should be offered between 12:00-12:59"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:141:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
______________________________ TestAppointmentAvailability.test_slot_has_required_fields ______________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000001252BB88910>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x000001252CCC6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x000001252F39BF50>

    def test_slot_has_required_fields(self):
        """Each slot should include time, dentist_id, and dentist_name"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:153:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_________________________________ TestAppointmentAvailability.test_filter_by_dentist __________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001252F3A02D0>

    def test_filter_by_dentist(self):
        """When filtered by dentist, all returned slots should be for that dentist"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday, 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:166: AssertionError
______________________________ TestAppointmentAvailability.test_missing_date_returns_400 ______________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001252F3A08D0>

    def test_missing_date_returns_400(self):
        """Omitting the required date parameter should return 400"""
        response = requests.get(f"{BASE_URL}/appointments/availability")
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:175: AssertionError
_______________________ TestAppointmentAvailability.test_booked_slot_excluded_from_availability _______________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001252F3A0F50>

    def test_booked_slot_excluded_from_availability(self):
        """A known booked slot should not appear in availability results"""
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': '2027-06-15', 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:183: AssertionError
___________________________________ TestAppointmentBooking.test_successful_booking ____________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000001252F3A1750>

    def test_successful_booking(self):
        """Should book an available slot and return confirmation"""
        future_weekday = _next_weekday(min_days_ahead=random.randint(30, 365))

        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P001",
            "dentist_id": "D001",
            "appointment_date": future_weekday,
            "appointment_time": "14:00",
            "reason": "Regular checkup"
        })
>       assert response.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:207: AssertionError
_______________________________ TestAppointmentBooking.test_seeded_conflict_returns_409 _______________________________

self = <test_requirements.TestAppointmentBooking object at 0x000001252F3A2410>

    def test_seeded_conflict_returns_409(self):
        """Booking an already-occupied slot should return 409.
        The slot 2027-06-15 at 10:00 with D001 is pre-booked in the legacy system."""
        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P002",
            "dentist_id": "D001",
            "appointment_date": "2027-06-15",
            "appointment_time": "10:00",
            "reason": "Conflict test"
        })
>       assert response.status_code == 409
E       assert 404 == 409
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:237: AssertionError
___________________________________ TestAppointmentBooking.test_idempotent_booking ____________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000001252F3A2B50>

    def test_idempotent_booking(self):
        """Submitting the same booking twice should not create a duplicate.
        Second request should return the same confirmation, not an error."""
        idempotent_date = _next_weekday(min_days_ahead=500)

        booking = {
            "patient_id": "P001",
            "dentist_id": "D002",
            "appointment_date": idempotent_date,
            "appointment_time": "15:30",
            "reason": "Idempotency test"
        }

        first = requests.post(f"{BASE_URL}/appointments/book", json=booking)
>       assert first.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:253: AssertionError
______________________________ TestAppointmentBooking.test_malformed_request_returns_400 ______________________________

self = <test_requirements.TestAppointmentBooking object at 0x000001252F3A3250>

    def test_malformed_request_returns_400(self):
        """Sending incomplete or empty booking data should return 400"""
        response = requests.post(f"{BASE_URL}/appointments/book", json={})
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:271: AssertionError
_________________________________________ TestResilience.test_errors_are_json _________________________________________

self = <test_requirements.TestResilience object at 0x000001252F3B40D0>

    def test_errors_are_json(self):
        """Error responses should be JSON, never HTML"""
        response = requests.get(f"{BASE_URL}/patients/9999999999")
>       assert response.headers['Content-Type'].startswith('application/json')
E       AssertionError: assert False
E        +  where False = <built-in method startswith of str object at 0x000001252F4212A0>('application/json')
E        +    where <built-in method startswith of str object at 0x000001252F4212A0> = 'text/html; charset=utf-8'.startswith

test_requirements.py:300: AssertionError
=============================================== short test summary info ===============================================
FAILED test_requirements.py::TestPatientLookup::test_patient_found - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestPatientLookup::test_patient_not_found - assert 200 == 404
FAILED test_requirements.py::TestPatientLookup::test_phone_format_handling - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestPatientLookup::test_dates_are_normalized - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestPatientLookup::test_booleans_are_booleans - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 - assert 404 == 400
FAILED test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability - assert 404 == 200
FAILED test_requirements.py::TestAppointmentBooking::test_successful_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 - assert 404 == 409
FAILED test_requirements.py::TestAppointmentBooking::test_idempotent_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 - assert 404 == 400
FAILED test_requirements.py::TestResilience::test_errors_are_json - AssertionError: assert False
============================================ 17 failed, 3 passed in 1.04s =============================================

D:\IdeaProjects\kindr_take_home>python test_requirements.py
================================================= test session starts =================================================
platform win32 -- Python 3.11.0, pytest-9.0.2, pluggy-1.6.0 -- C:\Python311\python.exe
cachedir: .pytest_cache
rootdir: D:\IdeaProjects\kindr_take_home
collected 20 items

test_requirements.py::TestPatientLookup::test_patient_found FAILED                                               [  5%]
test_requirements.py::TestPatientLookup::test_patient_not_found FAILED                                           [ 10%]
test_requirements.py::TestPatientLookup::test_phone_format_handling FAILED                                       [ 15%]
test_requirements.py::TestPatientLookup::test_dates_are_normalized PASSED                                        [ 20%]
test_requirements.py::TestPatientLookup::test_booleans_are_booleans FAILED                                       [ 25%]
test_requirements.py::TestPatientLookup::test_response_time PASSED                                               [ 30%]
test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots FAILED                             [ 35%]
test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty FAILED                             [ 40%]
test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots FAILED                                    [ 45%]
test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields FAILED                          [ 50%]
test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist FAILED                                 [ 55%]
test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 FAILED                          [ 60%]
test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability FAILED            [ 65%]
test_requirements.py::TestAppointmentBooking::test_successful_booking FAILED                                     [ 70%]
test_requirements.py::TestAppointmentBooking::test_nonexistent_patient_returns_404 PASSED                        [ 75%]
test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 FAILED                            [ 80%]
test_requirements.py::TestAppointmentBooking::test_idempotent_booking FAILED                                     [ 85%]
test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 FAILED                          [ 90%]
test_requirements.py::TestResilience::test_api_stays_up_under_legacy_failures PASSED                             [ 95%]
test_requirements.py::TestResilience::test_errors_are_json PASSED                                                [100%]

====================================================== FAILURES =======================================================
________________________________________ TestPatientLookup.test_patient_found _________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000015DC5154B90>

    def test_patient_found(self):
        """Should return patient data for a known phone number"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        assert response.status_code == 200

        data = response.json()
        required_fields = [
            'patient_id', 'first_name', 'last_name',
            'phone', 'date_of_birth', 'has_active_insurance', 'last_visit_date'
        ]
        for field in required_fields:
>           assert field in data, f"Missing required field: {field}"
E           AssertionError: Missing required field: patient_id
E           assert 'patient_id' in {'dob': '1985-03-15', 'firstName': 'John', 'insuranceActive': True, 'lastName': 'Smith', ...}

test_requirements.py:55: AssertionError
______________________________________ TestPatientLookup.test_patient_not_found _______________________________________

self = <test_requirements.TestPatientLookup object at 0x0000015DC52790D0>

    def test_patient_not_found(self):
        """Should return 404 for a phone number with no patient"""
        response = requests.get(f"{BASE_URL}/patients/9999999999")
>       assert response.status_code == 404
E       assert 200 == 404
E        +  where 200 = <Response [200]>.status_code

test_requirements.py:60: AssertionError
____________________________________ TestPatientLookup.test_phone_format_handling _____________________________________

self = <test_requirements.TestPatientLookup object at 0x0000015DC52797D0>

    def test_phone_format_handling(self):
        """Same patient should be found regardless of phone format"""
        formats = ['5551234567', '(555) 123-4567', '555-123-4567', '+15551234567']
        ids = set()
        for fmt in formats:
            response = requests.get(f"{BASE_URL}/patients/{fmt}")
            assert response.status_code == 200, f"Failed for format: {fmt}"
>           ids.add(response.json()['patient_id'])
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E           KeyError: 'patient_id'

test_requirements.py:69: KeyError
____________________________________ TestPatientLookup.test_booleans_are_booleans _____________________________________

self = <test_requirements.TestPatientLookup object at 0x0000015DC527A610>

    def test_booleans_are_booleans(self):
        """Insurance status should be a real boolean, not a string"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        data = response.json()

>       assert isinstance(data['has_active_insurance'], bool), \
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            f"Expected bool, got {type(data['has_active_insurance'])}"
E       KeyError: 'has_active_insurance'

test_requirements.py:90: KeyError
_______________________________ TestAppointmentAvailability.test_weekday_returns_slots ________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000015DC527B590>

    def test_weekday_returns_slots(self):
        """A weekday should have available slots"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:118: AssertionError
_______________________________ TestAppointmentAvailability.test_weekend_returns_empty ________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000015DC527A2D0>

    def test_weekend_returns_empty(self):
        """Weekends should return no available slots"""
        saturday = _next_weekend()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': saturday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:131: AssertionError
___________________________________ TestAppointmentAvailability.test_no_lunch_slots ___________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x0000015DC4783B10>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x0000015DC2BB6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x0000015DC527BA50>

    def test_no_lunch_slots(self):
        """No slots should be offered between 12:00-12:59"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:141:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
______________________________ TestAppointmentAvailability.test_slot_has_required_fields ______________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x0000015DC4783B10>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x0000015DC2BB6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x0000015DC527BDD0>

    def test_slot_has_required_fields(self):
        """Each slot should include time, dentist_id, and dentist_name"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:153:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_________________________________ TestAppointmentAvailability.test_filter_by_dentist __________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000015DC5280150>

    def test_filter_by_dentist(self):
        """When filtered by dentist, all returned slots should be for that dentist"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday, 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:166: AssertionError
______________________________ TestAppointmentAvailability.test_missing_date_returns_400 ______________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000015DC5280750>

    def test_missing_date_returns_400(self):
        """Omitting the required date parameter should return 400"""
        response = requests.get(f"{BASE_URL}/appointments/availability")
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:175: AssertionError
_______________________ TestAppointmentAvailability.test_booked_slot_excluded_from_availability _______________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000015DC5280DD0>

    def test_booked_slot_excluded_from_availability(self):
        """A known booked slot should not appear in availability results"""
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': '2027-06-15', 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:183: AssertionError
___________________________________ TestAppointmentBooking.test_successful_booking ____________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000015DC52815D0>

    def test_successful_booking(self):
        """Should book an available slot and return confirmation"""
        future_weekday = _next_weekday(min_days_ahead=random.randint(30, 365))

        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P001",
            "dentist_id": "D001",
            "appointment_date": future_weekday,
            "appointment_time": "14:00",
            "reason": "Regular checkup"
        })
>       assert response.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:207: AssertionError
_______________________________ TestAppointmentBooking.test_seeded_conflict_returns_409 _______________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000015DC5282290>

    def test_seeded_conflict_returns_409(self):
        """Booking an already-occupied slot should return 409.
        The slot 2027-06-15 at 10:00 with D001 is pre-booked in the legacy system."""
        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P002",
            "dentist_id": "D001",
            "appointment_date": "2027-06-15",
            "appointment_time": "10:00",
            "reason": "Conflict test"
        })
>       assert response.status_code == 409
E       assert 404 == 409
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:237: AssertionError
___________________________________ TestAppointmentBooking.test_idempotent_booking ____________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000015DC52829D0>

    def test_idempotent_booking(self):
        """Submitting the same booking twice should not create a duplicate.
        Second request should return the same confirmation, not an error."""
        idempotent_date = _next_weekday(min_days_ahead=500)

        booking = {
            "patient_id": "P001",
            "dentist_id": "D002",
            "appointment_date": idempotent_date,
            "appointment_time": "15:30",
            "reason": "Idempotency test"
        }

        first = requests.post(f"{BASE_URL}/appointments/book", json=booking)
>       assert first.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:253: AssertionError
______________________________ TestAppointmentBooking.test_malformed_request_returns_400 ______________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000015DC52830D0>

    def test_malformed_request_returns_400(self):
        """Sending incomplete or empty booking data should return 400"""
        response = requests.post(f"{BASE_URL}/appointments/book", json={})
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:271: AssertionError
=============================================== short test summary info ===============================================
FAILED test_requirements.py::TestPatientLookup::test_patient_found - AssertionError: Missing required field: patient_id
FAILED test_requirements.py::TestPatientLookup::test_patient_not_found - assert 200 == 404
FAILED test_requirements.py::TestPatientLookup::test_phone_format_handling - KeyError: 'patient_id'
FAILED test_requirements.py::TestPatientLookup::test_booleans_are_booleans - KeyError: 'has_active_insurance'
FAILED test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 - assert 404 == 400
FAILED test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability - assert 404 == 200
FAILED test_requirements.py::TestAppointmentBooking::test_successful_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 - assert 404 == 409
FAILED test_requirements.py::TestAppointmentBooking::test_idempotent_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 - assert 404 == 400
============================================ 15 failed, 5 passed in 22.91s ============================================

D:\IdeaProjects\kindr_take_home>python test_requirements.py
======================================================================== test session starts =========================================================================
platform win32 -- Python 3.11.0, pytest-9.0.2, pluggy-1.6.0 -- C:\Python311\python.exe
cachedir: .pytest_cache
rootdir: D:\IdeaProjects\kindr_take_home
collected 20 items

test_requirements.py::TestPatientLookup::test_patient_found FAILED                                                                                              [  5%]
test_requirements.py::TestPatientLookup::test_patient_not_found FAILED                                                                                          [ 10%]
test_requirements.py::TestPatientLookup::test_phone_format_handling FAILED                                                                                      [ 15%]
test_requirements.py::TestPatientLookup::test_dates_are_normalized PASSED                                                                                       [ 20%]
test_requirements.py::TestPatientLookup::test_booleans_are_booleans FAILED                                                                                      [ 25%]
test_requirements.py::TestPatientLookup::test_response_time PASSED                                                                                              [ 30%]
test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots FAILED                                                                            [ 35%]
test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty FAILED                                                                            [ 40%]
test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots FAILED                                                                                   [ 45%]
test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields FAILED                                                                         [ 50%]
test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist FAILED                                                                                [ 55%]
test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 FAILED                                                                         [ 60%]
test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability FAILED                                                           [ 65%]
test_requirements.py::TestAppointmentBooking::test_successful_booking FAILED                                                                                    [ 70%]
test_requirements.py::TestAppointmentBooking::test_nonexistent_patient_returns_404 PASSED                                                                       [ 75%]
test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 FAILED                                                                           [ 80%]
test_requirements.py::TestAppointmentBooking::test_idempotent_booking FAILED                                                                                    [ 85%]
test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 FAILED                                                                         [ 90%]
test_requirements.py::TestResilience::test_api_stays_up_under_legacy_failures PASSED                                                                            [ 95%]
test_requirements.py::TestResilience::test_errors_are_json PASSED                                                                                               [100%]

============================================================================== FAILURES ==============================================================================
________________________________________________________________ TestPatientLookup.test_patient_found ________________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000026530120DD0>

    def test_patient_found(self):
        """Should return patient data for a known phone number"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        assert response.status_code == 200

        data = response.json()
        required_fields = [
            'patient_id', 'first_name', 'last_name',
            'phone', 'date_of_birth', 'has_active_insurance', 'last_visit_date'
        ]
        for field in required_fields:
>           assert field in data, f"Missing required field: {field}"
E           AssertionError: Missing required field: first_name
E           assert 'first_name' in {'dob': '1985-03-15', 'firstName': 'John', 'insuranceActive': True, 'lastName': 'Smith', ...}

test_requirements.py:55: AssertionError
______________________________________________________________ TestPatientLookup.test_patient_not_found ______________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000026530C18F50>

    def test_patient_not_found(self):
        """Should return 404 for a phone number with no patient"""
        response = requests.get(f"{BASE_URL}/patients/9999999999")
>       assert response.status_code == 404
E       assert 200 == 404
E        +  where 200 = <Response [200]>.status_code

test_requirements.py:60: AssertionError
____________________________________________________________ TestPatientLookup.test_phone_format_handling ____________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000026530C19650>

    def test_phone_format_handling(self):
        """Same patient should be found regardless of phone format"""
        formats = ['5551234567', '(555) 123-4567', '555-123-4567', '+15551234567']
        ids = set()
        for fmt in formats:
            response = requests.get(f"{BASE_URL}/patients/{fmt}")
            assert response.status_code == 200, f"Failed for format: {fmt}"
>           ids.add(response.json()['patient_id'])
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E           KeyError: 'patient_id'

test_requirements.py:69: KeyError
____________________________________________________________ TestPatientLookup.test_booleans_are_booleans ____________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000026530C1A450>

    def test_booleans_are_booleans(self):
        """Insurance status should be a real boolean, not a string"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        data = response.json()

>       assert isinstance(data['has_active_insurance'], bool), \
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            f"Expected bool, got {type(data['has_active_insurance'])}"
E       KeyError: 'has_active_insurance'

test_requirements.py:90: KeyError
_______________________________________________________ TestAppointmentAvailability.test_weekday_returns_slots _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000026530C1B390>

    def test_weekday_returns_slots(self):
        """A weekday should have available slots"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:118: AssertionError
_______________________________________________________ TestAppointmentAvailability.test_weekend_returns_empty _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000026530C1A110>

    def test_weekend_returns_empty(self):
        """Weekends should return no available slots"""
        saturday = _next_weekend()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': saturday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:131: AssertionError
__________________________________________________________ TestAppointmentAvailability.test_no_lunch_slots ___________________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x0000026530123990>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x000002652E516810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x0000026530C1B850>

    def test_no_lunch_slots(self):
        """No slots should be offered between 12:00-12:59"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:141:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_____________________________________________________ TestAppointmentAvailability.test_slot_has_required_fields ______________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x0000026530123990>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x000002652E516810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x0000026530C1BBD0>

    def test_slot_has_required_fields(self):
        """Each slot should include time, dentist_id, and dentist_name"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:153:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_________________________________________________________ TestAppointmentAvailability.test_filter_by_dentist _________________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000026530C1BF10>

    def test_filter_by_dentist(self):
        """When filtered by dentist, all returned slots should be for that dentist"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday, 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:166: AssertionError
_____________________________________________________ TestAppointmentAvailability.test_missing_date_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000026530C20550>

    def test_missing_date_returns_400(self):
        """Omitting the required date parameter should return 400"""
        response = requests.get(f"{BASE_URL}/appointments/availability")
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:175: AssertionError
______________________________________________ TestAppointmentAvailability.test_booked_slot_excluded_from_availability _______________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000026530C20BD0>

    def test_booked_slot_excluded_from_availability(self):
        """A known booked slot should not appear in availability results"""
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': '2027-06-15', 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:183: AssertionError
___________________________________________________________ TestAppointmentBooking.test_successful_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000026530C21410>

    def test_successful_booking(self):
        """Should book an available slot and return confirmation"""
        future_weekday = _next_weekday(min_days_ahead=random.randint(30, 365))

        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P001",
            "dentist_id": "D001",
            "appointment_date": future_weekday,
            "appointment_time": "14:00",
            "reason": "Regular checkup"
        })
>       assert response.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:207: AssertionError
______________________________________________________ TestAppointmentBooking.test_seeded_conflict_returns_409 _______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000026530C220D0>

    def test_seeded_conflict_returns_409(self):
        """Booking an already-occupied slot should return 409.
        The slot 2027-06-15 at 10:00 with D001 is pre-booked in the legacy system."""
        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P002",
            "dentist_id": "D001",
            "appointment_date": "2027-06-15",
            "appointment_time": "10:00",
            "reason": "Conflict test"
        })
>       assert response.status_code == 409
E       assert 404 == 409
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:237: AssertionError
___________________________________________________________ TestAppointmentBooking.test_idempotent_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000026530C22810>

    def test_idempotent_booking(self):
        """Submitting the same booking twice should not create a duplicate.
        Second request should return the same confirmation, not an error."""
        idempotent_date = _next_weekday(min_days_ahead=500)

        booking = {
            "patient_id": "P001",
            "dentist_id": "D002",
            "appointment_date": idempotent_date,
            "appointment_time": "15:30",
            "reason": "Idempotency test"
        }

        first = requests.post(f"{BASE_URL}/appointments/book", json=booking)
>       assert first.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:253: AssertionError
_____________________________________________________ TestAppointmentBooking.test_malformed_request_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000026530C22F10>

    def test_malformed_request_returns_400(self):
        """Sending incomplete or empty booking data should return 400"""
        response = requests.post(f"{BASE_URL}/appointments/book", json={})
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:271: AssertionError
====================================================================== short test summary info =======================================================================
FAILED test_requirements.py::TestPatientLookup::test_patient_found - AssertionError: Missing required field: first_name
FAILED test_requirements.py::TestPatientLookup::test_patient_not_found - assert 200 == 404
FAILED test_requirements.py::TestPatientLookup::test_phone_format_handling - KeyError: 'patient_id'
FAILED test_requirements.py::TestPatientLookup::test_booleans_are_booleans - KeyError: 'has_active_insurance'
FAILED test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 - assert 404 == 400
FAILED test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability - assert 404 == 200
FAILED test_requirements.py::TestAppointmentBooking::test_successful_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 - assert 404 == 409
FAILED test_requirements.py::TestAppointmentBooking::test_idempotent_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 - assert 404 == 400
=================================================================== 15 failed, 5 passed in 20.85s ====================================================================

D:\IdeaProjects\kindr_take_home>python test_requirements.py
======================================================================== test session starts =========================================================================
platform win32 -- Python 3.11.0, pytest-9.0.2, pluggy-1.6.0 -- C:\Python311\python.exe
cachedir: .pytest_cache
rootdir: D:\IdeaProjects\kindr_take_home
collected 20 items

test_requirements.py::TestPatientLookup::test_patient_found FAILED                                                                                              [  5%]
test_requirements.py::TestPatientLookup::test_patient_not_found FAILED                                                                                          [ 10%]
test_requirements.py::TestPatientLookup::test_phone_format_handling FAILED                                                                                      [ 15%]
test_requirements.py::TestPatientLookup::test_dates_are_normalized PASSED                                                                                       [ 20%]
test_requirements.py::TestPatientLookup::test_booleans_are_booleans FAILED                                                                                      [ 25%]
test_requirements.py::TestPatientLookup::test_response_time PASSED                                                                                              [ 30%]
test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots FAILED                                                                            [ 35%]
test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty FAILED                                                                            [ 40%]
test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots FAILED                                                                                   [ 45%]
test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields FAILED                                                                         [ 50%]
test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist FAILED                                                                                [ 55%]
test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 FAILED                                                                         [ 60%]
test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability FAILED                                                           [ 65%]
test_requirements.py::TestAppointmentBooking::test_successful_booking FAILED                                                                                    [ 70%]
test_requirements.py::TestAppointmentBooking::test_nonexistent_patient_returns_404 PASSED                                                                       [ 75%]
test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 FAILED                                                                           [ 80%]
test_requirements.py::TestAppointmentBooking::test_idempotent_booking FAILED                                                                                    [ 85%]
test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 FAILED                                                                         [ 90%]
test_requirements.py::TestResilience::test_api_stays_up_under_legacy_failures PASSED                                                                            [ 95%]
test_requirements.py::TestResilience::test_errors_are_json PASSED                                                                                               [100%]

============================================================================== FAILURES ==============================================================================
________________________________________________________________ TestPatientLookup.test_patient_found ________________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x000002CFFD10A510>

    def test_patient_found(self):
        """Should return patient data for a known phone number"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        assert response.status_code == 200

        data = response.json()
        required_fields = [
            'patient_id', 'first_name', 'last_name',
            'phone', 'date_of_birth', 'has_active_insurance', 'last_visit_date'
        ]
        for field in required_fields:
>           assert field in data, f"Missing required field: {field}"
E           AssertionError: Missing required field: first_name
E           assert 'first_name' in {'dob': '1985-03-15', 'firstName': 'John', 'has_active_insurance': True, 'lastName': 'Smith', ...}

test_requirements.py:55: AssertionError
______________________________________________________________ TestPatientLookup.test_patient_not_found ______________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x000002CFFD179210>

    def test_patient_not_found(self):
        """Should return 404 for a phone number with no patient"""
        response = requests.get(f"{BASE_URL}/patients/9999999999")
>       assert response.status_code == 404
E       assert 200 == 404
E        +  where 200 = <Response [200]>.status_code

test_requirements.py:60: AssertionError
____________________________________________________________ TestPatientLookup.test_phone_format_handling ____________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x000002CFFD179910>

    def test_phone_format_handling(self):
        """Same patient should be found regardless of phone format"""
        formats = ['5551234567', '(555) 123-4567', '555-123-4567', '+15551234567']
        ids = set()
        for fmt in formats:
            response = requests.get(f"{BASE_URL}/patients/{fmt}")
            assert response.status_code == 200, f"Failed for format: {fmt}"
>           ids.add(response.json()['patient_id'])
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E           KeyError: 'patient_id'

test_requirements.py:69: KeyError
____________________________________________________________ TestPatientLookup.test_booleans_are_booleans ____________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x000002CFFD17A750>

    def test_booleans_are_booleans(self):
        """Insurance status should be a real boolean, not a string"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        data = response.json()

>       assert isinstance(data['has_active_insurance'], bool), \
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            f"Expected bool, got {type(data['has_active_insurance'])}"
E       KeyError: 'has_active_insurance'

test_requirements.py:90: KeyError
_______________________________________________________ TestAppointmentAvailability.test_weekday_returns_slots _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000002CFFD17B690>

    def test_weekday_returns_slots(self):
        """A weekday should have available slots"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:118: AssertionError
_______________________________________________________ TestAppointmentAvailability.test_weekend_returns_empty _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000002CFFD17A1D0>

    def test_weekend_returns_empty(self):
        """Weekends should return no available slots"""
        saturday = _next_weekend()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': saturday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:131: AssertionError
__________________________________________________________ TestAppointmentAvailability.test_no_lunch_slots ___________________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000002CFF98B8910>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x000002CFFAA76810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x000002CFFD17BB50>

    def test_no_lunch_slots(self):
        """No slots should be offered between 12:00-12:59"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:141:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_____________________________________________________ TestAppointmentAvailability.test_slot_has_required_fields ______________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000002CFF98B8910>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x000002CFFAA76810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x000002CFFD17BED0>

    def test_slot_has_required_fields(self):
        """Each slot should include time, dentist_id, and dentist_name"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:153:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_________________________________________________________ TestAppointmentAvailability.test_filter_by_dentist _________________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000002CFFD180250>

    def test_filter_by_dentist(self):
        """When filtered by dentist, all returned slots should be for that dentist"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday, 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:166: AssertionError
_____________________________________________________ TestAppointmentAvailability.test_missing_date_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000002CFFD180850>

    def test_missing_date_returns_400(self):
        """Omitting the required date parameter should return 400"""
        response = requests.get(f"{BASE_URL}/appointments/availability")
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:175: AssertionError
______________________________________________ TestAppointmentAvailability.test_booked_slot_excluded_from_availability _______________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000002CFFD180ED0>

    def test_booked_slot_excluded_from_availability(self):
        """A known booked slot should not appear in availability results"""
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': '2027-06-15', 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:183: AssertionError
___________________________________________________________ TestAppointmentBooking.test_successful_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000002CFFD1816D0>

    def test_successful_booking(self):
        """Should book an available slot and return confirmation"""
        future_weekday = _next_weekday(min_days_ahead=random.randint(30, 365))

        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P001",
            "dentist_id": "D001",
            "appointment_date": future_weekday,
            "appointment_time": "14:00",
            "reason": "Regular checkup"
        })
>       assert response.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:207: AssertionError
______________________________________________________ TestAppointmentBooking.test_seeded_conflict_returns_409 _______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000002CFFD182390>

    def test_seeded_conflict_returns_409(self):
        """Booking an already-occupied slot should return 409.
        The slot 2027-06-15 at 10:00 with D001 is pre-booked in the legacy system."""
        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P002",
            "dentist_id": "D001",
            "appointment_date": "2027-06-15",
            "appointment_time": "10:00",
            "reason": "Conflict test"
        })
>       assert response.status_code == 409
E       assert 404 == 409
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:237: AssertionError
___________________________________________________________ TestAppointmentBooking.test_idempotent_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000002CFFD182AD0>

    def test_idempotent_booking(self):
        """Submitting the same booking twice should not create a duplicate.
        Second request should return the same confirmation, not an error."""
        idempotent_date = _next_weekday(min_days_ahead=500)

        booking = {
            "patient_id": "P001",
            "dentist_id": "D002",
            "appointment_date": idempotent_date,
            "appointment_time": "15:30",
            "reason": "Idempotency test"
        }

        first = requests.post(f"{BASE_URL}/appointments/book", json=booking)
>       assert first.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:253: AssertionError
_____________________________________________________ TestAppointmentBooking.test_malformed_request_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000002CFFD1831D0>

    def test_malformed_request_returns_400(self):
        """Sending incomplete or empty booking data should return 400"""
        response = requests.post(f"{BASE_URL}/appointments/book", json={})
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:271: AssertionError
====================================================================== short test summary info =======================================================================
FAILED test_requirements.py::TestPatientLookup::test_patient_found - AssertionError: Missing required field: first_name
FAILED test_requirements.py::TestPatientLookup::test_patient_not_found - assert 200 == 404
FAILED test_requirements.py::TestPatientLookup::test_phone_format_handling - KeyError: 'patient_id'
FAILED test_requirements.py::TestPatientLookup::test_booleans_are_booleans - KeyError: 'has_active_insurance'
FAILED test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 - assert 404 == 400
FAILED test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability - assert 404 == 200
FAILED test_requirements.py::TestAppointmentBooking::test_successful_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 - assert 404 == 409
FAILED test_requirements.py::TestAppointmentBooking::test_idempotent_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 - assert 404 == 400
=================================================================== 15 failed, 5 passed in 22.59s ====================================================================

D:\IdeaProjects\kindr_take_home>python test_requirements.py
======================================================================== test session starts =========================================================================
platform win32 -- Python 3.11.0, pytest-9.0.2, pluggy-1.6.0 -- C:\Python311\python.exe
cachedir: .pytest_cache
rootdir: D:\IdeaProjects\kindr_take_home
collected 20 items

test_requirements.py::TestPatientLookup::test_patient_found FAILED                                                                                              [  5%]
test_requirements.py::TestPatientLookup::test_patient_not_found FAILED                                                                                          [ 10%]
test_requirements.py::TestPatientLookup::test_phone_format_handling FAILED                                                                                      [ 15%]
test_requirements.py::TestPatientLookup::test_dates_are_normalized PASSED                                                                                       [ 20%]
test_requirements.py::TestPatientLookup::test_booleans_are_booleans PASSED                                                                                      [ 25%]
test_requirements.py::TestPatientLookup::test_response_time FAILED                                                                                              [ 30%]
test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots FAILED                                                                            [ 35%]
test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty FAILED                                                                            [ 40%]
test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots FAILED                                                                                   [ 45%]
test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields FAILED                                                                         [ 50%]
test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist FAILED                                                                                [ 55%]
test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 FAILED                                                                         [ 60%]
test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability FAILED                                                           [ 65%]
test_requirements.py::TestAppointmentBooking::test_successful_booking FAILED                                                                                    [ 70%]
test_requirements.py::TestAppointmentBooking::test_nonexistent_patient_returns_404 PASSED                                                                       [ 75%]
test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 FAILED                                                                           [ 80%]
test_requirements.py::TestAppointmentBooking::test_idempotent_booking FAILED                                                                                    [ 85%]
test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 FAILED                                                                         [ 90%]
test_requirements.py::TestResilience::test_api_stays_up_under_legacy_failures PASSED                                                                            [ 95%]
test_requirements.py::TestResilience::test_errors_are_json PASSED                                                                                               [100%]

============================================================================== FAILURES ==============================================================================
________________________________________________________________ TestPatientLookup.test_patient_found ________________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x000001A5C99F1150>

    def test_patient_found(self):
        """Should return patient data for a known phone number"""
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        assert response.status_code == 200

        data = response.json()
        required_fields = [
            'patient_id', 'first_name', 'last_name',
            'phone', 'date_of_birth', 'has_active_insurance', 'last_visit_date'
        ]
        for field in required_fields:
>           assert field in data, f"Missing required field: {field}"
E           AssertionError: Missing required field: last_name
E           assert 'last_name' in {'dob': '1985-03-15', 'first_name': 'John', 'has_active_insurance': True, 'lastName': 'Smith', ...}

test_requirements.py:55: AssertionError
______________________________________________________________ TestPatientLookup.test_patient_not_found ______________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x000001A5C9AE9290>

    def test_patient_not_found(self):
        """Should return 404 for a phone number with no patient"""
        response = requests.get(f"{BASE_URL}/patients/9999999999")
>       assert response.status_code == 404
E       assert 200 == 404
E        +  where 200 = <Response [200]>.status_code

test_requirements.py:60: AssertionError
____________________________________________________________ TestPatientLookup.test_phone_format_handling ____________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x000001A5C9AE9990>

    def test_phone_format_handling(self):
        """Same patient should be found regardless of phone format"""
        formats = ['5551234567', '(555) 123-4567', '555-123-4567', '+15551234567']
        ids = set()
        for fmt in formats:
            response = requests.get(f"{BASE_URL}/patients/{fmt}")
            assert response.status_code == 200, f"Failed for format: {fmt}"
>           ids.add(response.json()['patient_id'])
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E           KeyError: 'patient_id'

test_requirements.py:69: KeyError
________________________________________________________________ TestPatientLookup.test_response_time ________________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x000001A5C9AEAED0>

    def test_response_time(self):
        """Must respond in under 2 seconds (warm cache is acceptable)"""
        # Warm request
        requests.get(f"{BASE_URL}/patients/5551234567")

        start = time.time()
        response = requests.get(f"{BASE_URL}/patients/5551234567")
        elapsed = time.time() - start

        assert response.status_code == 200
>       assert elapsed < 2.0, f"Response took {elapsed:.2f}s, must be under 2s"
E       AssertionError: Response took 3.07s, must be under 2s
E       assert 3.072695732116699 < 2.0

test_requirements.py:103: AssertionError
_______________________________________________________ TestAppointmentAvailability.test_weekday_returns_slots _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001A5C9AEB6D0>

    def test_weekday_returns_slots(self):
        """A weekday should have available slots"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:118: AssertionError
_______________________________________________________ TestAppointmentAvailability.test_weekend_returns_empty _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001A5C9AEA250>

    def test_weekend_returns_empty(self):
        """Weekends should return no available slots"""
        saturday = _next_weekend()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': saturday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:131: AssertionError
__________________________________________________________ TestAppointmentAvailability.test_no_lunch_slots ___________________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000001A5C8FF38D0>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x000001A5C7406810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x000001A5C9AEBB90>

    def test_no_lunch_slots(self):
        """No slots should be offered between 12:00-12:59"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:141:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_____________________________________________________ TestAppointmentAvailability.test_slot_has_required_fields ______________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x000001A5C8FF38D0>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x000001A5C7406810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x000001A5C9AEBF10>

    def test_slot_has_required_fields(self):
        """Each slot should include time, dentist_id, and dentist_name"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:153:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_________________________________________________________ TestAppointmentAvailability.test_filter_by_dentist _________________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001A5C9AF0290>

    def test_filter_by_dentist(self):
        """When filtered by dentist, all returned slots should be for that dentist"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday, 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:166: AssertionError
_____________________________________________________ TestAppointmentAvailability.test_missing_date_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001A5C9AF0890>

    def test_missing_date_returns_400(self):
        """Omitting the required date parameter should return 400"""
        response = requests.get(f"{BASE_URL}/appointments/availability")
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:175: AssertionError
______________________________________________ TestAppointmentAvailability.test_booked_slot_excluded_from_availability _______________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000001A5C9AF0F10>

    def test_booked_slot_excluded_from_availability(self):
        """A known booked slot should not appear in availability results"""
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': '2027-06-15', 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:183: AssertionError
___________________________________________________________ TestAppointmentBooking.test_successful_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000001A5C9AF1750>

    def test_successful_booking(self):
        """Should book an available slot and return confirmation"""
        future_weekday = _next_weekday(min_days_ahead=random.randint(30, 365))

        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P001",
            "dentist_id": "D001",
            "appointment_date": future_weekday,
            "appointment_time": "14:00",
            "reason": "Regular checkup"
        })
>       assert response.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:207: AssertionError
______________________________________________________ TestAppointmentBooking.test_seeded_conflict_returns_409 _______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000001A5C9AF2410>

    def test_seeded_conflict_returns_409(self):
        """Booking an already-occupied slot should return 409.
        The slot 2027-06-15 at 10:00 with D001 is pre-booked in the legacy system."""
        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P002",
            "dentist_id": "D001",
            "appointment_date": "2027-06-15",
            "appointment_time": "10:00",
            "reason": "Conflict test"
        })
>       assert response.status_code == 409
E       assert 404 == 409
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:237: AssertionError
___________________________________________________________ TestAppointmentBooking.test_idempotent_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000001A5C9AF2B50>

    def test_idempotent_booking(self):
        """Submitting the same booking twice should not create a duplicate.
        Second request should return the same confirmation, not an error."""
        idempotent_date = _next_weekday(min_days_ahead=500)

        booking = {
            "patient_id": "P001",
            "dentist_id": "D002",
            "appointment_date": idempotent_date,
            "appointment_time": "15:30",
            "reason": "Idempotency test"
        }

        first = requests.post(f"{BASE_URL}/appointments/book", json=booking)
>       assert first.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:253: AssertionError
_____________________________________________________ TestAppointmentBooking.test_malformed_request_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x000001A5C9AF3250>

    def test_malformed_request_returns_400(self):
        """Sending incomplete or empty booking data should return 400"""
        response = requests.post(f"{BASE_URL}/appointments/book", json={})
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:271: AssertionError
====================================================================== short test summary info =======================================================================
FAILED test_requirements.py::TestPatientLookup::test_patient_found - AssertionError: Missing required field: last_name
FAILED test_requirements.py::TestPatientLookup::test_patient_not_found - assert 200 == 404
FAILED test_requirements.py::TestPatientLookup::test_phone_format_handling - KeyError: 'patient_id'
FAILED test_requirements.py::TestPatientLookup::test_response_time - AssertionError: Response took 3.07s, must be under 2s
FAILED test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 - assert 404 == 400
FAILED test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability - assert 404 == 200
FAILED test_requirements.py::TestAppointmentBooking::test_successful_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 - assert 404 == 409
FAILED test_requirements.py::TestAppointmentBooking::test_idempotent_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 - assert 404 == 400
=================================================================== 15 failed, 5 passed in 37.34s ====================================================================

D:\IdeaProjects\kindr_take_home>python test_requirements.py
======================================================================== test session starts =========================================================================
platform win32 -- Python 3.11.0, pytest-9.0.2, pluggy-1.6.0 -- C:\Python311\python.exe
cachedir: .pytest_cache
rootdir: D:\IdeaProjects\kindr_take_home
collected 20 items

test_requirements.py::TestPatientLookup::test_patient_found PASSED                                                                                              [  5%]
test_requirements.py::TestPatientLookup::test_patient_not_found FAILED                                                                                          [ 10%]
test_requirements.py::TestPatientLookup::test_phone_format_handling FAILED                                                                                      [ 15%]
test_requirements.py::TestPatientLookup::test_dates_are_normalized PASSED                                                                                       [ 20%]
test_requirements.py::TestPatientLookup::test_booleans_are_booleans PASSED                                                                                      [ 25%]
test_requirements.py::TestPatientLookup::test_response_time PASSED                                                                                              [ 30%]
test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots FAILED                                                                            [ 35%]
test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty FAILED                                                                            [ 40%]
test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots FAILED                                                                                   [ 45%]
test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields FAILED                                                                         [ 50%]
test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist FAILED                                                                                [ 55%]
test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 FAILED                                                                         [ 60%]
test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability FAILED                                                           [ 65%]
test_requirements.py::TestAppointmentBooking::test_successful_booking FAILED                                                                                    [ 70%]
test_requirements.py::TestAppointmentBooking::test_nonexistent_patient_returns_404 PASSED                                                                       [ 75%]
test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 FAILED                                                                           [ 80%]
test_requirements.py::TestAppointmentBooking::test_idempotent_booking FAILED                                                                                    [ 85%]
test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 FAILED                                                                         [ 90%]
test_requirements.py::TestResilience::test_api_stays_up_under_legacy_failures PASSED                                                                            [ 95%]
test_requirements.py::TestResilience::test_errors_are_json PASSED                                                                                               [100%]

============================================================================== FAILURES ==============================================================================
______________________________________________________________ TestPatientLookup.test_patient_not_found ______________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000021BAEEC9210>

    def test_patient_not_found(self):
        """Should return 404 for a phone number with no patient"""
        response = requests.get(f"{BASE_URL}/patients/9999999999")
>       assert response.status_code == 404
E       assert 200 == 404
E        +  where 200 = <Response [200]>.status_code

test_requirements.py:60: AssertionError
____________________________________________________________ TestPatientLookup.test_phone_format_handling ____________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000021BAEEC9910>

    def test_phone_format_handling(self):
        """Same patient should be found regardless of phone format"""
        formats = ['5551234567', '(555) 123-4567', '555-123-4567', '+15551234567']
        ids = set()
        for fmt in formats:
            response = requests.get(f"{BASE_URL}/patients/{fmt}")
            assert response.status_code == 200, f"Failed for format: {fmt}"
>           ids.add(response.json()['patient_id'])
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E           KeyError: 'patient_id'

test_requirements.py:69: KeyError
_______________________________________________________ TestAppointmentAvailability.test_weekday_returns_slots _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000021BAEECB690>

    def test_weekday_returns_slots(self):
        """A weekday should have available slots"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:118: AssertionError
_______________________________________________________ TestAppointmentAvailability.test_weekend_returns_empty _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000021BAEECA1D0>

    def test_weekend_returns_empty(self):
        """Weekends should return no available slots"""
        saturday = _next_weekend()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': saturday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:131: AssertionError
__________________________________________________________ TestAppointmentAvailability.test_no_lunch_slots ___________________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x0000021BAB678910>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x0000021BAC7C6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x0000021BAEECBB50>

    def test_no_lunch_slots(self):
        """No slots should be offered between 12:00-12:59"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:141:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_____________________________________________________ TestAppointmentAvailability.test_slot_has_required_fields ______________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x0000021BAB678910>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x0000021BAC7C6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x0000021BAEECBED0>

    def test_slot_has_required_fields(self):
        """Each slot should include time, dentist_id, and dentist_name"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:153:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_________________________________________________________ TestAppointmentAvailability.test_filter_by_dentist _________________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000021BAEED0250>

    def test_filter_by_dentist(self):
        """When filtered by dentist, all returned slots should be for that dentist"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday, 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:166: AssertionError
_____________________________________________________ TestAppointmentAvailability.test_missing_date_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000021BAEED0850>

    def test_missing_date_returns_400(self):
        """Omitting the required date parameter should return 400"""
        response = requests.get(f"{BASE_URL}/appointments/availability")
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:175: AssertionError
______________________________________________ TestAppointmentAvailability.test_booked_slot_excluded_from_availability _______________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000021BAEED0ED0>

    def test_booked_slot_excluded_from_availability(self):
        """A known booked slot should not appear in availability results"""
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': '2027-06-15', 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:183: AssertionError
___________________________________________________________ TestAppointmentBooking.test_successful_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000021BAEED16D0>

    def test_successful_booking(self):
        """Should book an available slot and return confirmation"""
        future_weekday = _next_weekday(min_days_ahead=random.randint(30, 365))

        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P001",
            "dentist_id": "D001",
            "appointment_date": future_weekday,
            "appointment_time": "14:00",
            "reason": "Regular checkup"
        })
>       assert response.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:207: AssertionError
______________________________________________________ TestAppointmentBooking.test_seeded_conflict_returns_409 _______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000021BAEED2390>

    def test_seeded_conflict_returns_409(self):
        """Booking an already-occupied slot should return 409.
        The slot 2027-06-15 at 10:00 with D001 is pre-booked in the legacy system."""
        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P002",
            "dentist_id": "D001",
            "appointment_date": "2027-06-15",
            "appointment_time": "10:00",
            "reason": "Conflict test"
        })
>       assert response.status_code == 409
E       assert 404 == 409
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:237: AssertionError
___________________________________________________________ TestAppointmentBooking.test_idempotent_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000021BAEED2AD0>

    def test_idempotent_booking(self):
        """Submitting the same booking twice should not create a duplicate.
        Second request should return the same confirmation, not an error."""
        idempotent_date = _next_weekday(min_days_ahead=500)

        booking = {
            "patient_id": "P001",
            "dentist_id": "D002",
            "appointment_date": idempotent_date,
            "appointment_time": "15:30",
            "reason": "Idempotency test"
        }

        first = requests.post(f"{BASE_URL}/appointments/book", json=booking)
>       assert first.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:253: AssertionError
_____________________________________________________ TestAppointmentBooking.test_malformed_request_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000021BAEED31D0>

    def test_malformed_request_returns_400(self):
        """Sending incomplete or empty booking data should return 400"""
        response = requests.post(f"{BASE_URL}/appointments/book", json={})
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:271: AssertionError
====================================================================== short test summary info =======================================================================
FAILED test_requirements.py::TestPatientLookup::test_patient_not_found - assert 200 == 404
FAILED test_requirements.py::TestPatientLookup::test_phone_format_handling - KeyError: 'patient_id'
FAILED test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 - assert 404 == 400
FAILED test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability - assert 404 == 200
FAILED test_requirements.py::TestAppointmentBooking::test_successful_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 - assert 404 == 409
FAILED test_requirements.py::TestAppointmentBooking::test_idempotent_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 - assert 404 == 400
=================================================================== 13 failed, 7 passed in 16.84s ====================================================================

D:\IdeaProjects\kindr_take_home>python test_requirements.py
======================================================================== test session starts =========================================================================
platform win32 -- Python 3.11.0, pytest-9.0.2, pluggy-1.6.0 -- C:\Python311\python.exe
cachedir: .pytest_cache
rootdir: D:\IdeaProjects\kindr_take_home
collected 20 items

test_requirements.py::TestPatientLookup::test_patient_found PASSED                                                                                              [  5%]
test_requirements.py::TestPatientLookup::test_patient_not_found FAILED                                                                                          [ 10%]
test_requirements.py::TestPatientLookup::test_phone_format_handling FAILED                                                                                      [ 15%]
test_requirements.py::TestPatientLookup::test_dates_are_normalized PASSED                                                                                       [ 20%]
test_requirements.py::TestPatientLookup::test_booleans_are_booleans PASSED                                                                                      [ 25%]
test_requirements.py::TestPatientLookup::test_response_time PASSED                                                                                              [ 30%]
test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots FAILED                                                                            [ 35%]
test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty FAILED                                                                            [ 40%]
test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots FAILED                                                                                   [ 45%]
test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields FAILED                                                                         [ 50%]
test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist FAILED                                                                                [ 55%]
test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 FAILED                                                                         [ 60%]
test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability FAILED                                                           [ 65%]
test_requirements.py::TestAppointmentBooking::test_successful_booking FAILED                                                                                    [ 70%]
test_requirements.py::TestAppointmentBooking::test_nonexistent_patient_returns_404 PASSED                                                                       [ 75%]
test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 FAILED                                                                           [ 80%]
test_requirements.py::TestAppointmentBooking::test_idempotent_booking FAILED                                                                                    [ 85%]
test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 FAILED                                                                         [ 90%]
test_requirements.py::TestResilience::test_api_stays_up_under_legacy_failures PASSED                                                                            [ 95%]
test_requirements.py::TestResilience::test_errors_are_json PASSED                                                                                               [100%]

============================================================================== FAILURES ==============================================================================
______________________________________________________________ TestPatientLookup.test_patient_not_found ______________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000026175389210>

    def test_patient_not_found(self):
        """Should return 404 for a phone number with no patient"""
        response = requests.get(f"{BASE_URL}/patients/9999999999")
>       assert response.status_code == 404
E       assert 200 == 404
E        +  where 200 = <Response [200]>.status_code

test_requirements.py:60: AssertionError
____________________________________________________________ TestPatientLookup.test_phone_format_handling ____________________________________________________________

self = <test_requirements.TestPatientLookup object at 0x0000026175389910>

    def test_phone_format_handling(self):
        """Same patient should be found regardless of phone format"""
        formats = ['5551234567', '(555) 123-4567', '555-123-4567', '+15551234567']
        ids = set()
        for fmt in formats:
            response = requests.get(f"{BASE_URL}/patients/{fmt}")
            assert response.status_code == 200, f"Failed for format: {fmt}"
>           ids.add(response.json()['patient_id'])
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E           KeyError: 'patient_id'

test_requirements.py:69: KeyError
_______________________________________________________ TestAppointmentAvailability.test_weekday_returns_slots _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000002617538B690>

    def test_weekday_returns_slots(self):
        """A weekday should have available slots"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:118: AssertionError
_______________________________________________________ TestAppointmentAvailability.test_weekend_returns_empty _______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x000002617538A1D0>

    def test_weekend_returns_empty(self):
        """Weekends should return no available slots"""
        saturday = _next_weekend()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': saturday}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:131: AssertionError
__________________________________________________________ TestAppointmentAvailability.test_no_lunch_slots ___________________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x0000026171BA8910>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x0000026172CE6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x000002617538BB50>

    def test_no_lunch_slots(self):
        """No slots should be offered between 12:00-12:59"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:141:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_____________________________________________________ TestAppointmentAvailability.test_slot_has_required_fields ______________________________________________________

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
>           return complexjson.loads(self.text, **kwargs)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

C:\Python311\Lib\site-packages\requests\models.py:976:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
C:\Python311\Lib\site-packages\simplejson\__init__.py:514: in loads
return _default_decoder.decode(s)
^^^^^^^^^^^^^^^^^^^^^^^^^^
C:\Python311\Lib\site-packages\simplejson\decoder.py:386: in decode
obj, end = self.raw_decode(s)
^^^^^^^^^^^^^^^^^^
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <simplejson.decoder.JSONDecoder object at 0x0000026171BA8910>
s = '<!DOCTYPE html><html><head><title></title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Not F... at router (D:\\IdeaProjects\\kindr_take_home\\node_modules\\express\\lib\\router\\index.js:47:12)</pre></body></html>'
idx = 0, _w = <built-in method match of re.Pattern object at 0x0000026172CE6810>, _PY3 = True

    def raw_decode(self, s, idx=0, _w=WHITESPACE.match, _PY3=PY3):
        """Decode a JSON document from ``s`` (a ``str`` or ``unicode``
        beginning with a JSON document) and return a 2-tuple of the Python
        representation and the index in ``s`` where the document ended.
        Optionally, ``idx`` can be used to specify an offset in ``s`` where
        the JSON document begins.

        This can be used to decode a JSON document from a string that may
        have extraneous data at the end.

        """
        if idx < 0:
            # Ensure that raw_decode bails on negative indexes, the regex
            # would otherwise mask this behavior. #98
            raise JSONDecodeError('Expecting value', s, idx)
        if _PY3 and not isinstance(s, str):
            raise TypeError("Input string must be text, not bytes")
        # strip UTF-8 bom
        if len(s) > idx:
            ord0 = ord(s[idx])
            if ord0 == 0xfeff:
                idx += 1
            elif ord0 == 0xef and s[idx:idx + 3] == '\xef\xbb\xbf':
                idx += 3
>       return self.scan_once(s, idx=_w(s, idx).end())
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       simplejson.errors.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\simplejson\decoder.py:416: JSONDecodeError

During handling of the above exception, another exception occurred:

self = <test_requirements.TestAppointmentAvailability object at 0x000002617538BED0>

    def test_slot_has_required_fields(self):
        """Each slot should include time, dentist_id, and dentist_name"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday}
        )
>       slots = response.json()['available_slots']
                ^^^^^^^^^^^^^^^

test_requirements.py:153:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <Response [404]>, kwargs = {}

    def json(self, **kwargs):
        r"""Decodes the JSON response body (if any) as a Python object.

        This may return a dictionary, list, etc. depending on what is in the response.

        :param \*\*kwargs: Optional arguments that ``json.loads`` takes.
        :raises requests.exceptions.JSONDecodeError: If the response body does not
            contain valid json.
        """

        if not self.encoding and self.content and len(self.content) > 3:
            # No encoding set. JSON RFC 4627 section 3 states we should expect
            # UTF-8, -16 or -32. Detect which one to use; If the detection or
            # decoding fails, fall back to `self.text` (using charset_normalizer to make
            # a best guess).
            encoding = guess_json_utf(self.content)
            if encoding is not None:
                try:
                    return complexjson.loads(self.content.decode(encoding), **kwargs)
                except UnicodeDecodeError:
                    # Wrong UTF codec detected; usually because it's not UTF-8
                    # but some other 8-bit codec.  This is an RFC violation,
                    # and the server didn't bother to tell us what codec *was*
                    # used.
                    pass
                except JSONDecodeError as e:
                    raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)

        try:
            return complexjson.loads(self.text, **kwargs)
        except JSONDecodeError as e:
            # Catch JSON-related errors and raise as requests.JSONDecodeError
            # This aliases json.JSONDecodeError and simplejson.JSONDecodeError
>           raise RequestsJSONDecodeError(e.msg, e.doc, e.pos)
E           requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)

C:\Python311\Lib\site-packages\requests\models.py:980: JSONDecodeError
_________________________________________________________ TestAppointmentAvailability.test_filter_by_dentist _________________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000026175390250>

    def test_filter_by_dentist(self):
        """When filtered by dentist, all returned slots should be for that dentist"""
        weekday = _next_weekday()
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': weekday, 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:166: AssertionError
_____________________________________________________ TestAppointmentAvailability.test_missing_date_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000026175390850>

    def test_missing_date_returns_400(self):
        """Omitting the required date parameter should return 400"""
        response = requests.get(f"{BASE_URL}/appointments/availability")
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:175: AssertionError
______________________________________________ TestAppointmentAvailability.test_booked_slot_excluded_from_availability _______________________________________________

self = <test_requirements.TestAppointmentAvailability object at 0x0000026175390ED0>

    def test_booked_slot_excluded_from_availability(self):
        """A known booked slot should not appear in availability results"""
        response = requests.get(
            f"{BASE_URL}/appointments/availability",
            params={'date': '2027-06-15', 'dentist_id': 'D001'}
        )
>       assert response.status_code == 200
E       assert 404 == 200
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:183: AssertionError
___________________________________________________________ TestAppointmentBooking.test_successful_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x00000261753916D0>

    def test_successful_booking(self):
        """Should book an available slot and return confirmation"""
        future_weekday = _next_weekday(min_days_ahead=random.randint(30, 365))

        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P001",
            "dentist_id": "D001",
            "appointment_date": future_weekday,
            "appointment_time": "14:00",
            "reason": "Regular checkup"
        })
>       assert response.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:207: AssertionError
______________________________________________________ TestAppointmentBooking.test_seeded_conflict_returns_409 _______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000026175392390>

    def test_seeded_conflict_returns_409(self):
        """Booking an already-occupied slot should return 409.
        The slot 2027-06-15 at 10:00 with D001 is pre-booked in the legacy system."""
        response = requests.post(f"{BASE_URL}/appointments/book", json={
            "patient_id": "P002",
            "dentist_id": "D001",
            "appointment_date": "2027-06-15",
            "appointment_time": "10:00",
            "reason": "Conflict test"
        })
>       assert response.status_code == 409
E       assert 404 == 409
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:237: AssertionError
___________________________________________________________ TestAppointmentBooking.test_idempotent_booking ___________________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x0000026175392AD0>

    def test_idempotent_booking(self):
        """Submitting the same booking twice should not create a duplicate.
        Second request should return the same confirmation, not an error."""
        idempotent_date = _next_weekday(min_days_ahead=500)

        booking = {
            "patient_id": "P001",
            "dentist_id": "D002",
            "appointment_date": idempotent_date,
            "appointment_time": "15:30",
            "reason": "Idempotency test"
        }

        first = requests.post(f"{BASE_URL}/appointments/book", json=booking)
>       assert first.status_code in [200, 201]
E       assert 404 in [200, 201]
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:253: AssertionError
_____________________________________________________ TestAppointmentBooking.test_malformed_request_returns_400 ______________________________________________________

self = <test_requirements.TestAppointmentBooking object at 0x00000261753931D0>

    def test_malformed_request_returns_400(self):
        """Sending incomplete or empty booking data should return 400"""
        response = requests.post(f"{BASE_URL}/appointments/book", json={})
>       assert response.status_code == 400
E       assert 404 == 400
E        +  where 404 = <Response [404]>.status_code

test_requirements.py:271: AssertionError
====================================================================== short test summary info =======================================================================
FAILED test_requirements.py::TestPatientLookup::test_patient_not_found - assert 200 == 404
FAILED test_requirements.py::TestPatientLookup::test_phone_format_handling - KeyError: 'patient_id'
FAILED test_requirements.py::TestAppointmentAvailability::test_weekday_returns_slots - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_weekend_returns_empty - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_no_lunch_slots - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_slot_has_required_fields - requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
FAILED test_requirements.py::TestAppointmentAvailability::test_filter_by_dentist - assert 404 == 200
FAILED test_requirements.py::TestAppointmentAvailability::test_missing_date_returns_400 - assert 404 == 400
FAILED test_requirements.py::TestAppointmentAvailability::test_booked_slot_excluded_from_availability - assert 404 == 200
FAILED test_requirements.py::TestAppointmentBooking::test_successful_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_seeded_conflict_returns_409 - assert 404 == 409
FAILED test_requirements.py::TestAppointmentBooking::test_idempotent_booking - assert 404 in [200, 201]
FAILED test_requirements.py::TestAppointmentBooking::test_malformed_request_returns_400 - assert 404 == 400
=================================================================== 13 failed, 7 passed in 32.82s ====================================================================

D:\IdeaProjects\kindr_take_home>
