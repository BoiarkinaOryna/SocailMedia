import { PRISMA_CLIENT } from "../../config/client";
import { InternalServerError } from "../../errors";
import { PostRepositoryContracts } from "./types/post.contracts";


export const PostRepository: PostRepositoryContracts = {
    create: async function (id, data) {
        try {
            const post = await PRISMA_CLIENT.post_app_post.create({
                data: {
                    author_id: id,
                    title: data.title,
                    topic: data.topic,
                    content: data.content,
                    created_at: new Date()
                }
            })
            for (const link of data.links ?? []){
                await PRISMA_CLIENT.post_app_postlink.create({
                    data:{
                        post_id: post.id,
                        url: link
                    }
                })

            }
            return post
        } catch (error){
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
    },
    addImage: async function (data) {
        try {
            return await PRISMA_CLIENT.post_app_postimage.create({
                data: {
                    post_id: BigInt(data.postId),
                    original_image: data.originalImage,
                    compressed_image: data.compressedImage,
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
    },
    getAll: async function (take, page){
        try{
            const posts = await PRISMA_CLIENT.post_app_post.findMany({
               skip: take * (page - 1),
                    take,
                    include: {
                        post_app_postimage: true,
                        post_app_postlink: true,
                        user_app_user: {
                            include: {
                                profile_app_profile: true
                            }
                        }
                    }
                })  
            return posts
        } catch (error){
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
    },
    getMy: async function (id, take, page) {
        try{
            const posts = await PRISMA_CLIENT.post_app_post.findMany({
                where: { author_id: id },
                skip: (take - take * page),
                take,
                include: {
                    post_app_postimage: true,
                    post_app_postlink: true,
                    user_app_user: {
                        include: {
                            profile_app_profile: true
                        }
                    }
                }
            })
            console.log("my posts", posts)
            return posts
        } catch (error){
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
    },
    delete: async function (id) {
        try{
            await PRISMA_CLIENT.post_app_post.delete({where: {id}})
        } catch (error){
            if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError();
        }
    }
}
