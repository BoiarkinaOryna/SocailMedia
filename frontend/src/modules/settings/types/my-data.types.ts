import { Asserts, type InferType } from "yup";
import { albumValidator, myDataValidator } from "../models/my-data.validation";

export type MyDataSchema = InferType<typeof myDataValidator>

export type AlbumSchema = InferType<typeof albumValidator>