import { dbContext } from '../db/DbContext'

class PostsService {
  async getAll(query = {}) {
    const posts = dbContext.Posts.find(query)
    return posts
  }

  async create(postData) {
    const post = await dbContext.Posts.create(postData)
    return post
  }
}
export const postsService = new PostsService()
