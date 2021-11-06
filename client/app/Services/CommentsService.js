import { ProxyState } from '../AppState.js'
import { CommentsController } from '../Controllers/CommentsController.js'
import { Comment } from '../Models/Comment.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class CommentsService {
  constructor() {
    logger.log('Service connected')
  }

  async getAllComments(query) {
    const res = await api.get('api/comments' + query)
    logger.log(res)
    ProxyState.commentPage = res.data.page
    ProxyState.comments = res.data.resuts.map(c => new Comment(c))
  }

  async createComment(commentData) {
    const res = await api.comment('api/comments', commentData)
    logger.log(res)
    const newComment = new Comment(res.data)
    ProxyState.comments = [...ProxyState.comments, newComment]
  }

  async editComment(commentData, id) {
    const res = api.put('api/comments' + id, commentData)
    logger.log(res)
    const index = ProxyState.comments.findIndex(c => c.id === id)
    ProxyState.posts.splice(index, 1, new Comment(res.data))
    // eslint-disable-next-line no-self-assign
    ProxyState.comments = ProxyState.comments
  }

  async deleteComment(id) {
    const res = await api.delete('api/comments' + id)
    logger.log(res.data)
    ProxyState.comments = ProxyState.comments.filter(c => c.id !== id)
  }
}

export const commentsService = new CommentsService()
