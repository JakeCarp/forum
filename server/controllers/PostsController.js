import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'

export class PostsController {
  constructor() {
    logger.log('hello from posts controller', postsService)
  }
}
