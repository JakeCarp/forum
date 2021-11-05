import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
    //   .get(':/posts/king', this.getKing)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
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

  async create(req, res, next) {
    try {
      const postData = req.body
      postData.creatorId = req.userInfo.id
      const post = await postsService.create(postData)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }
}
