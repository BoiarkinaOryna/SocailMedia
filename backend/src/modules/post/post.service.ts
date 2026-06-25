import { PostRepository } from "./post.repository";
import { PostServiceContracts } from "./types/post.contracts";


export const PostService: PostServiceContracts = {
    create: async function (id, data) {
        return await PostRepository.create(id, data)
    },
    addImage: async function (data) {
        return await PostRepository.addImage(data)
    },
    getAll: async function (currentUserId, take, page) {
        return await PostRepository.getAll(currentUserId, take, page)
    },
    getMy: async function (id, take, page) {
        return await PostRepository.getMy(id, take, page)
    },
    delete: async function (id) {
        await PostRepository.delete(id)
    },
}
