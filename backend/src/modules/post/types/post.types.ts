import { Prisma } from "@prisma/client"

export type Post = Prisma.post_app_postGetPayload<{}>

export type PostCredentials = {
    title: string,
    topic?: string,
    content: string,
    links?: string[],
    image?: string
}

export type PostImageCredentials = {
    postId: number | string,
    originalImage: string,
    compressedImage: string,
}
