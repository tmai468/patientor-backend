import diagnoses from "../../data/diagnoses";
import { Diagnose } from "../types";

const getAllDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

export default {
    getAllDiagnoses
};