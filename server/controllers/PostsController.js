import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from '../db/DbContext'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
    //   .get(':/posts/king', this.getKing)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const posts = await postsService.getAll(query)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id
      const post = await postsService.getById(id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const postData = req.body
      delete postData.upVotes
      delete postData.downVotes
      delete postData.totalVotes
      postData.creatorId = req.userInfo.id
      const post = await postsService.create(postData)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const postData = req.body
      postData.creatorId = req.userInfo.id
      postData.id = req.params.id
      const post = await postsService.edit(postData)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      await postsService.remove(req.params.id, userId)
      res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}