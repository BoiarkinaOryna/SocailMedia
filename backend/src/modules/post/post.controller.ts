import { BadRequestError } from "../../errors"
import { AuthenticationError, ForbiddenError } from "../../errors/app.errors"
import { PostService } from "./post.service"
import { PostControllerContracts } from "./types/post.contracts"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { uploadDir } from "../../config/path"


export const PostController: PostControllerContracts = {
    create: async function (req, res, next) {
        try {
            const userId = res.locals.userId
            if (!userId) {
                throw new AuthenticationError("Authorization is required")
            }
            console.log("create post data:", userId, {
                title: req.body.title,
                topic: req.body.topic,
                content: req.body.content,
                links: req.body.links,
                hasImage: Boolean(req.body.image),
                imageLength: req.body.image?.length ?? 0,
                imagesCount: req.body.images?.length ?? 0,
            })
            const post = await PostService.create(userId, req.body)

            const images = req.body.images?.length ? req.body.images : req.body.image ? [req.body.image] : []

            for (const image of images) {
                await savePostImage(image, post.id)
            }

            res.status(201).json(post)
        } catch (error){
            next(error)
        }
    },
    addImage: async function (req, res, next) {
        try {
            const { image, postId } = req.body

            if (!image || !postId) {
                throw new BadRequestError()
            }

            const result = await savePostImage(image, postId)

            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    },
    getAll: async function (req, res, next) {
        try{
            const takeRaw = req.query.take
            const pageRaw = req.query.page

            const take = takeRaw !== undefined ? Number(takeRaw) : 15
            const page = pageRaw !== undefined ? Number(pageRaw) : 1
            if (take && isNaN(+take)){
                throw new BadRequestError
            }
            if (page && isNaN(+page)){
                throw new BadRequestError
            }
            const userId = res.locals.userId
            const posts = await PostService.getAll(
                userId,
                take && +take,
                page && +page
            )
            console.log("posts", posts)
            res.json(posts)
        } catch (error) {
            next(error)
        }
    },
    getMy: async function (req, res, next) {
        try {
            const takeRaw = req.query.take
            const pageRaw = req.query.page

            const take = takeRaw !== undefined ? Number(takeRaw) : 15
            const page = pageRaw !== undefined ? Number(pageRaw) : 1

            if (take && isNaN(+take)){
                throw new BadRequestError
            }
            if (page && isNaN(+page)){
                throw new BadRequestError
            }
            const userId = res.locals.userId
            const posts = await PostService.getMy(
                userId,
                take && +take,
                page && +page
            )
            res.json(posts)
        } catch (error){
            next(error)
        }
    },
    delete: async function (req, res, next) {
        try {
            const userId = res.locals.userId
            const currentUserID = req.body.userId
            if (userId === currentUserID){
                await PostService.delete(req.body.postId)
                res.status(204).json()
            } else {
                throw new ForbiddenError("Can't delete another user's post")
            }
        } catch (error){
            next(error)
        }
    }
}

async function savePostImage(image: string, postId: number | string | bigint) {
    fs.mkdirSync(uploadDir, { recursive: true })

    const fileName = `post_${postId}_${Date.now()}_${crypto.randomUUID()}.jpg`
    const filePath = path.join(uploadDir, fileName)
    const matches = image.match(/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/)
    const base64 = matches ? matches[2] : image
    const buffer = Buffer.from(base64, "base64")

    fs.writeFileSync(filePath, buffer)
    console.log("saved post image:", fileName, buffer.length)

    return await PostService.addImage({
        postId: postId.toString(),
        originalImage: fileName,
        compressedImage: fileName,
    })
}
