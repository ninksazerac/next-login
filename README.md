This is a starter template for [Learn Next.js](https://nextjs.org/learn).
``````````````````````````````````````
Firebase + Google Cloud name : login-google

=====================================
https://medium.com/google-cloud/using-google-apis-with-firebase-auth-and-firebase-ui-on-the-web-46e6189cf571

=====================================

Bill Payment Gateway Portal
- Next.js (React Front-end + Node.js Back-end)
- Bootstrap 5 (Front-end CSS)
- Sign in with Google (pop-up) using Firebase Auth
  - Front-end Auth => https://firebase.google.com/docs/auth/web/google-signin
  - Back-end Auth => https://firebase.google.com/docs/auth/admin/verify-id-tokens
- Firebase AppCheck (Allow only valid AppCheck token)
  - Front-end AppCheck => https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider
  - Back-end AppCheck => https://firebase.google.com/docs/app-check/custom-resource-backend
- Role base permission [Not Confirm]
- Assign Role to User (email) [Not Confirm]
- figma: https://www.figma.com/file/Y5wjG4IxlDaNw9BaoCB1RB/Bill-Payment-Gateway-Portal?type=design&node-id=0%3A1&t=9wP6QAgqHySHinFQ-1

=====================================
update

- Next.js (React Front-end)
  - Bootstrap 5 (CSS Framework)
  - path: /portal
- Nest.js (Node.js Back-end)
  - path: /portal/api
- Docker image with environment configuration (Next.js & Nest.js)
  - Next.js Image name: bill-pgw-portal-frontend (port: 3000)
  - Nest.js Image name: bill-pgw-portal-backend (port: 9000)

- Sign in with Google (pop-up) using Firebase Auth
  - Front-end Auth => https://firebase.google.com/docs/auth/web/google-signin
  - Back-end Auth => https://firebase.google.com/docs/auth/admin/verify-id-tokens
- Firebase AppCheck (Allow only valid AppCheck token)
  - Front-end AppCheck => https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider
  - Back-end AppCheck => https://firebase.google.com/docs/app-check/custom-resource-backend
- Role-Based Access Control (RBAC)
- Assign Role to User (email)
- department & position based [not now]