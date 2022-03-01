export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
};

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    // diagnosisCodes: string[]
    type: EntryType
    diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    // type: "HealthCheck";
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface SickLeaveEntry {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    // type: 'OccupationalHealthcare';
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: SickLeaveEntry;
}

export interface DischargeEntry {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    // type: 'Hospital',
    type: EntryType.Hospital;
    discharge?: DischargeEntry;
}

export type Entry = 
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

// define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Entry {
// }

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export enum EntryType {
    HealthCheck = "HealthCheck",
    OccupationalHealthcare = "OccupationalHealthcare",
    Hospital = "Hospital",
}

type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;

export type NewPatient = Omit<Patient, 'id'>;

export type NewBaseEntry = Omit<BaseEntry, "id">;
export type NewEntry = DistributiveOmit<Entry, 'id'>;
export type PublicPatient = Omit<Patient, "ssn" | "entries">;