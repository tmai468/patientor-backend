# patientor-backend
Backend for patientor app, built using Express, TypeScript, used HTTP REST API as networking protocol.

To install dependencies and start the BE in dev mode, run:
```
npm install
npm run dev
```
The backend's data can be accessed through `localhost`'s port 3002 by default. The different API endpoints are at `localhost:3002/api/patients` and `localhost:3002/api/diagnosis` respectively. Make sure this port is not previously occupied in order to run the backend. 
There's also a directory `rest` made for API testing purposes (similar to Postman).
