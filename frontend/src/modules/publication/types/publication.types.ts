import { InferType } from "yup";
import { publicationValidator } from "../models/publication.validation";

export type PublicationSchema = InferType<typeof publicationValidator>;

export type PostImage = {
  id?: number;
  uri?: string | null;
  url?: string | null;
  filename?: string | null;
  path?: string | null;
  original_image?: string | null;
  compressed_image?: string | null;
};

export type Post = {
  id: number;
  links: string[] | null;
  post_app_postimage?: PostImage[] | null;
  post_app_postlink?: { id?: number; url: string }[] | null;
  title: string;
  topic: string | null;
  content: string | null;
  userId: number | null;
  images?: PostImage[] | null;
};

export type CreatePost = {
  links?: string;
  title: string;
  topic: string;
  content: string;
  image?: string | null;
};
