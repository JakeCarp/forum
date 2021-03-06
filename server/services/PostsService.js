import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    const page = query.page || 1
    delete query.page
    const totalPages = Math.ceil(await dbContext.Posts.count() / 5)
    const posts = await dbContext.Posts.find(query).sort({ votes: 'desc' }).populate('creator', 'name picture').limit(25).skip((page - 1) * 25)
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

  async vote(postId, voterId, voteStr) {
    const post = await dbContext.Posts.find(p => p.id === postId)
    const poster = await dbContext.Profiles.find(p => p.id === post.creatorId)
    const voter = await dbContext.Profiles.find(p => p.id === voterId)
    if (voteStr === 'up') {
      poster.votes += 1 + (0.5 * voter.votes)
    } else if (voteStr === 'down') {
      poster.votes -= 1 + (0.5 * voter.votes)
    }
  }

  async getKing() {
    const profiles = await dbContext.Profiles.find()
    profiles.sort({ votes: 'desc' })
    const king = profiles[0]
    const query = `?creatorId = ${king.id}`
    const topPost = postsService.getAll(query)
    return { king: king, topPost: topPost }
  }

  async remove(postId, userId) {
    const post = await this.getById(postId)
    if (post.creatorId.toString() !== userId) {
      throw new Forbidden('You shall not pass!')
    }
    await dbContext.Comments.deleteMany({ postId: postId })
    await dbContext.Posts.findByIdAndDelete(postId)
  }
}
export const postsService = new PostsService()
