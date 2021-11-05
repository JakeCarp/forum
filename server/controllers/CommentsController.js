import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const comments = await commentsService.getAll(query)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id
      const post = await commentsService.getById(id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      const comment = await commentsService.create(commentData)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      commentData.id = req.params.id
      const comment = await commentsService.edit(commentData)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      await commentsService.remove(req.params.id, userId)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
