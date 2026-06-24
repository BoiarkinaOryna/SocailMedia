import { Prisma, profile_app_albumimage } from "@prisma/client";


// export type Album = Prisma.profile_app_albumGetPayload<{
//   include: {profile_app_albumimage: true}
// }>;

type AlbumImage = Omit<
  Prisma.profile_app_albumimageGetPayload<{}>,
  "id" | "album_id"
> & {
  id: number;
  album_id: number;
};

export type Album = Omit<
  Prisma.profile_app_albumGetPayload<{
    include: { profile_app_albumimage: true };
  }>,
  "id" | "profile_id" | "profile_app_albumimage"
> & {
  id: number;
  profile_id: number;
  profile_app_albumimage: AlbumImage[];
};

export type AlbumWithoutImages = Omit<
  Prisma.profile_app_albumGetPayload<{}>,
  "id" | "profile_id"
> & {
  id: number;
  profile_id: number;
};

export type AlbumInfo = {
  name: string;
  theme: string | null;
  year: number | null;
};

export type UpdateAlbum = Partial<AlbumInfo>;

export type addImageDTO = {
  image: string;
  albumId: number;
};
