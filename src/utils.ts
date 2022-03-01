import { NewPatient, Gender, NewEntry, NewBaseEntry, EntryType, Diagnose, HealthCheckRating, SickLeaveEntry, DischargeEntry } from "./types";


const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}


const parseName = (name: unknown) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
}

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing description: ${text}`);
    }
    return text;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Invalid or missing SSN: " + ssn);
    }
    return ssn;
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const isArrayOfStrings = (param: any[]): param is string[] => {
    return param.every(ele => (typeof ele === "string" || ele instanceof String));
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing weather: " + gender);
    }
    return gender;
}

const parseEntryType = (entryType: any): EntryType => {
    if (!Object.values(EntryType).includes(entryType)) {
        throw new Error(`Incorrect or missing entry type: ${entryType}`);
    }
    return entryType;
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Invalid or missing occupation: " + occupation);
    }
    return occupation;
}

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose["code"]> => {
    if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
        throw new Error("Incorrect or missing diagnoses codes");
    }
    return diagnosisCodes;
}

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (
        healthCheckRating === null ||
        healthCheckRating === undefined ||
        !isHealthCheckRating(healthCheckRating)
    ) {
        throw new Error(
            `Incorrect or missing health check rating: ${healthCheckRating || ""}`
        );
    }
    return healthCheckRating;
}

type SickLeaveFields = {
    startDate: unknown;
    endDate: unknown;
}

type DischargeFields = {
    date: unknown;
    criteria: unknown;
}


const parseSickLeave = (sickLeave: SickLeaveFields): SickLeaveEntry => {
    if (!sickLeave) {
        throw new Error("Missing sick leave");
    }
    return {
        startDate: parseDateOfBirth(sickLeave.startDate),
        endDate: parseDateOfBirth(sickLeave.endDate)
    };
}

const parseDischarge = (discharge: DischargeFields): DischargeEntry => {
    if (!discharge) {
        throw new Error("Missing discharge");
    }

    return {
        date: parseDateOfBirth(discharge.date),
        criteria: parseString(discharge.criteria)
    };
};

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown
}

type FieldsEntryGeneric = {
    type: unknown;
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown;
    healthCheckRating?: unknown;
    employerName?: unknown;
    sickLeave?: SickLeaveFields;
    discharge?: DischargeFields;
}



const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newPatientEntry = {
        // id: uuid(),
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    }

    return newPatientEntry;
}

const toNewBaseEntry = (object: FieldsEntryGeneric): NewBaseEntry => {
    const newBaseEntry: NewBaseEntry = {
        type: parseEntryType(object.type),
        description: parseString(object.description),
        date: parseDateOfBirth(object.date),
        specialist: parseString(object.specialist)
    };

    if (object.diagnosisCodes) {
        newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    return newBaseEntry;
}

const toPatientNewEntry = (object: FieldsEntryGeneric): NewEntry => {
    const newBaseEntry = toNewBaseEntry(object) as NewEntry;

    switch (newBaseEntry.type) {
        case EntryType.HealthCheck:
            return {
                ...newBaseEntry,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };

        case EntryType.OccupationalHealthcare:
            const newEntry = {
                ...newBaseEntry,
                employerName: parseString(object.employerName)
            };
            if (object.sickLeave) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }

            return newEntry;

        case EntryType.Hospital:
            const newDischargeEntry = {
                ...newBaseEntry
            }
            if (object.discharge) {
                newDischargeEntry.discharge = parseDischarge(object.discharge);
            };
            return newDischargeEntry;
        
        default:
            return assertNever(newBaseEntry);
    }
};

export { toNewPatientEntry,
    toPatientNewEntry };