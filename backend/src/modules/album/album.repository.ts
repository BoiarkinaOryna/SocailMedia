import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PRISMA_CLIENT } from "../../config/client";
import { InternalServerError, NotFoundError } from "../../errors";
import { PrismaErrorCodes } from "../../types/error-codes";
import { AlbumRepositoryContract } from "./types/album.contracts";
import { addImageDTO, AlbumInfo, UpdateAlbum } from "./types/album.types";

export const AlbumRepository: AlbumRepositoryContract = {
  async create(data, profileId) {
    try {
      await PRISMA_CLIENT.profile_app_album.create({
        data: {
          name: data.name,
          theme: data.theme,
          year: data.year,
          profile_id: profileId,
          created_at: new Date(),
          is_default: false,
          is_shown: true
        },
      });
    } catch (error) {
      throw handlePrismaError(error, "Album");
    }
  },

  async update(data, id) {
    try {
      await PRISMA_CLIENT.profile_app_album.update({
        where: { id },
        data: {
          name: data.name,
          theme: data.theme,
          year: data.year,
        },
      });
    } catch (error) {
      throw handlePrismaError(error, "Album");
    }
  },
  async getInfo(id) {
    try {
      return await PRISMA_CLIENT.profile_app_album.findUnique({
        where: { id },
      })
    } catch (error) {
      throw handlePrismaError(error, "Album");
    }
  },

  async getById(id: number) {
    try {
      const album = await PRISMA_CLIENT.profile_app_album.findUnique({
        where: { id },
      });
      return convertIds(album)
    } catch (error) {
      throw handlePrismaError(error, "Album");
    }
  },
  getAlbums: async (profileId: number) => {
    try{ 
      const albums = await PRISMA_CLIENT.profile_app_album.findMany({
        where: { profile_id: profileId },
        include: {
          profile_app_albumimage: true,
        },
      });
      
      return convertIds(albums)
      // return albums
    } catch (error){
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorCodes.NOT_EXIST:
            return null
          default:
            throw new InternalServerError();
        }
      }
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
      throw new InternalServerError();
    }
  },
  
  addImage: async (data: addImageDTO) => {
    try{ 
      await PRISMA_CLIENT.profile_app_albumimage.create({
        data: {
          image: data.image,
          album_id: data.albumId,
          is_shown: true,
          created_at: new Date()
        },
      });
    } catch (error){
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
      throw new InternalServerError();
    }
  },
  
  deleteAlbum: async (id: number) => {
    try{ 
      PRISMA_CLIENT.profile_app_album.delete({
        where: { id },
      });
    } catch (error){
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorCodes.NOT_EXIST:
            return
          default:
            throw new InternalServerError();
        }
      }
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
      throw new InternalServerError();
    }
  },
};

function handlePrismaError(error: any, entityName: string) {
  console.log("handlePrismaError:", error)
  throw new NotFoundError(entityName)
}


type BigIntToNumber<T> =
  T extends bigint ? number
  : T extends Date ? T
  : T extends Function ? T
  : T extends Array<infer U> ? BigIntToNumber<U>[]
  : T extends object ? { [K in keyof T]: BigIntToNumber<T[K]> }
  : T;
const bigintKeys = new Set([
  "id",
  "user_id",
  "profile_id",
  "album_id",
]);

function convertIds<T>(obj: T): BigIntToNumber<T> {
  if (Array.isArray(obj)) {
    obj.forEach(convertIds);
    return obj as BigIntToNumber<T>;
  }

  if (obj !== null && typeof obj === "object") {
    for (const [key, value] of Object.entries(obj)) {
      if (bigintKeys.has(key) && typeof value === "bigint") {
        (obj as Record<string, unknown>)[key] = Number(value);
      } else {
        convertIds(value);
      }
    }
  }

  return obj as BigIntToNumber<T>;
}