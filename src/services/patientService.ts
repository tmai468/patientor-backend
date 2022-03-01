import patients from "../../data/patients";
import { Patient, NewPatient, NewEntry, Entry } from "../types";
import { v1 as uuid } from 'uuid';


let savedPatients = [...patients];

const getAllPatientsExcludeSsn = (): Patient[] => {
    return savedPatients.map(({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
        ssn
    }));
};

const addPatient = ({ name, dateOfBirth, gender, occupation, ssn }: NewPatient): Patient => {
    const newPatient: Patient = {
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
        id: uuid(),
        entries: []
    };
    savedPatients = [...patients, newPatient];
    return newPatient
}

const findPatientWithId = ({ id }: { id: string }): Patient | undefined => {
    const patientLookedFor = patients.find(patient => patient.id === id);
    console.log('patient looked for is');
    console.log(patientLookedFor);
    return patientLookedFor;
}

const addEntry = (newEntryOfPatient: NewEntry, patient: Patient): Patient => {
    const newFullEntry: Entry = {...newEntryOfPatient, id: uuid() };
    const savedPatient = {
        ...patient,
        entries: patient.entries.concat(newFullEntry)
    };
    savedPatients = patients.map(patient => {
        return patient.id === savedPatient.id ? savedPatient : patient
    });

    return savedPatient;
};

export default {
    getAllPatientsExcludeSsn,
    addPatient,
    findPatientWithId,
    addEntry
};