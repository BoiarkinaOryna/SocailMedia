import { BadRequestError } from "../../errors"
import { ForbiddenError } from "../../errors/app.errors"
import { PostService } from "./post.service"
import { PostControllerContracts } from "./types/post.contracts"
import fs from "fs"
import path from "path"
import { uploadDir } from "../../config/path"


export const PostController: PostControllerContracts = {
    create: async function (req, res, next) {
        try {
            const userId = res.locals.userId
            console.log("create post data:", userId, {
                title: req.body.title,
                topic: req.body.topic,
                content: req.body.content,
                links: req.body.links,
                hasImage: Boolean(req.body.image),
                imageLength: req.body.image?.length ?? 0,
            })
            const post = await PostService.create(userId, req.body)

            if (req.body.image) {
                await savePostImage(req.body.image, post.id)
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
            const posts = await PostService.getAll(
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
                res.status(202).json()
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

    const fileName = `post_${postId}_${Date.now()}.jpg`
    const filePath = path.join(uploadDir, fileName)
    const buffer = Buffer.from(image, "base64")

    fs.writeFileSync(filePath, buffer)
    console.log("saved post image:", fileName, buffer.length)

    return await PostService.addImage({
        postId: postId.toString(),
        originalImage: fileName,
        compressedImage: fileName,
    })
}
