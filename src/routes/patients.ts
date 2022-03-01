import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toPatientNewEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
    // res.send('accessing patients');
    res.send(patientService.getAllPatientsExcludeSsn());
});

patientsRouter.get("/:id", (req, res) => {
    // console.log(`params id is ${req.params.id}`);
    const patientFound = patientService.findPatientWithId({id: req.params.id});
    if (patientFound) {
        res.json(patientFound);
    } else {
        res.status(400).send("Patient with the given ID can't be found");
    }
});

patientsRouter.post("/:id/entries", (req, res) => {
    // const patientFound = patientService.findPatientWithId({id: req.params.id});
    const patientFound = patientService.findPatientWithId({ id: req.params.id });
    if (patientFound) {
        try {
            const newEntry = toPatientNewEntry(req.body);
            const updatedPatient = patientService.addEntry(newEntry, patientFound);
            res.json(updatedPatient);

        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(400).send({ error: e.message });
            }
        }
        
    } else {
        res.status(400).send({ error: "Patient with the above ID does not exist. "});
    }

    
})

patientsRouter.post("/", (req, res) => {
    // const newPatient = patientService.addPatient(req.body);
    // res.json(newPatient);
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        patientService.addPatient(newPatientEntry);
        res.json(newPatientEntry);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default patientsRouter;