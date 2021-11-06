import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Posts.js'
import { Profile } from '../Models/Profile.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res)
    ProxyState.page = res.data.page
    ProxyState.posts = res.data.results.map(p => new Post(p))
  }

  async getPostById(id) {
    const res = api.get('api/posts' + id)
    logger.log(res.data)
    ProxyState.featuredPost = new Post(res.data)
  }

  async getKing() {
    const res = await api.get('api/profiles/king')
    logger.log(res.data.king)
    ProxyState.king = new Profile(res.data)
    ProxyState.featuredPost = new Post(res.data.topPost)
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    logger.log(res)
    const newPost = new Post(res.data)
    ProxyState.posts = [...ProxyState.posts, newPost]
  }

  async vote(id, voteStr) {
    const res = await api.put('api/posts/' + id + '/' + voteStr)
    logger.log(res.data)
    this.getAllPosts()
    this.getKing()
  }

  async editPost(postData, id) {
    const res = api.put('api/posts' + id, postData)
    logger.log(res)
    const index = ProxyState.posts.findIndex(p => p.id === id)
    ProxyState.posts.splice(index, 1, new Post(res.data))
    // eslint-disable-next-line no-self-assign
    ProxyState.posts = ProxyState.posts
  }

  async deletePost(id) {
    const res = await api.delete('api/posts' + id)
    logger.log(res.data)
    ProxyState.posts = ProxyState.posts.filter(p => p.id !== id)
  }
}

export const postsService = new PostsService()
