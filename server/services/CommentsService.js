import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {
  async getAll(query) {
    const comment = await dbContext.Comments.find(query)
    return comment
  }

  async getById(id) {
    const comment = dbContext.Comments.findById(id)
      .populate('creator', 'name picture')
      .populate('post', 'title')
    if (!comment) {
      throw new BadRequest('This comment has ceased to exist.')
    }
    return comment
  }

  async create(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    return comment
  }

  async edit(commentData) {
    const comment = await this.getById(commentData.id)
    if (comment.creatorId.toString() !== commentData.creatorId) {
      throw new Forbidden('You do not have permission to do this!')
    }
    const updated = await dbContext.Comments.findById(commentData.id, commentData, { new: true })
    return updated
  }

  async remove(commentId, userId) {
    const comment = await this.getById(commentId)
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('Begone, foul servant!')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }
}

export const commentsService = new CommentsService()
