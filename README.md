# NodeJWTAuthenticationSample
Sample that shows JWT Auth0 using NodeJS

## Smoke test end point: http://localhost:55000/api/

## Call the login to get the token: http://localhost:55000/api/login
Need to pass username and password as basic authentication first.

## Call the secured api: localhost:55000/api/secured
Pass the token that was received from step 2 e.g. bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJhaG1hbiIsInVzZXIiOnsibmFtZSI6InJhaG1hbiBtYWhtb29kaSIsImlkIjoxMTExLCJyb2xlIjoiQWRtaW4ifSwiaWF0IjoxNTI2NDY3MjUwfQ.tx6e4zh12QvYOZGg7qsdK63OAo7Tyy00pCQKhx_mFDM
