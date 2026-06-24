import { InferType } from "yup";
import { firstVisitValidator } from "../models/first-visit.validation";

export type firstVisitSchema = InferType<typeof firstVisitValidator>
export type firstVisitDto = {
    username: string,
    pseudonym: string
}