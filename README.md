![Screenshot](./screenshot.png)

# books
This small library management web application provides users the ability to browse, check out, and return books. The user must sign in, using Okta's identity cloud platform, before checking out or returning books.

## How to Run
Dev:
```text
npm install
REACT_APP_PORT=<PORT> REACT_APP_OIDC_ISSUER=<ISSUER> REACT_APP_OIDC_CLIENT_ID=<CLIENT_ID> npm start
```
Prod:
```text
npm install
npm run build
REACT_APP_PORT=<PORT> REACT_APP_OIDC_ISSUER=<ISSUER> REACT_APP_OIDC_CLIENT_ID=<CLIENT_ID> node server.js
```

#### Environment Variables
REACT_APP_PORT, REACT_APP_OIDC_ISSUER, REACT_APP_OIDC_CLIENT_ID