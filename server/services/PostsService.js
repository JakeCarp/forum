import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    const page = query.page || 1
    delete query.page
    const totalPages = Math.ceil(await dbContext.Packages.count() / 5)
    const posts = await dbContext.Posts.find(query).populate('creator', 'name picture').limit(25).skip((page - 1) * 25)
    return { results: posts, page, totalPages }
  }

  async getById(id) {
    const post = dbContext.Posts.findById(id).populate('creator', 'name picture')
    if (!post) {
      throw new BadRequest('The post you seek does not exist')
    }
    return post
  }

  async create(postData) {
    const post = await dbContext.Posts.create(postData)
    return post
  }

  async edit(postData) {
    const post = await this.getById(postData.id)
    if (post.creatorId.toString() !== postData.creatorId) {
      throw new Forbidden('You shall not pass!')
    }

    const updated = await dbContext.Posts.findByIdAndUpdate(postData.id, postData, { new: true })
    return updated
  }

  async remove(postId, userId) {
    const post = await this.getById(postId)
    if (post.creatorId.toString() !== userId) {
      throw new Forbidden('You shall not pass!')
    }
    await dbContext.Posts.findByIdAndDelete(postId)
  }
}
export const postsService = new PostsService()
