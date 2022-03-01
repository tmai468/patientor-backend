import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => {
    console.log(`req is ${req}`);
    res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})