import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'
import { getPostForm } from '../Forms/GetPostForm.js'
import { getFeaturedPostTemplate } from '../Forms/GetFeaturedPostTemplate.js'

// private functions
function _drawPosts() {
  const posts = ProxyState.posts
  let template = ''
  posts.forEach(p => { template += p.Template })
  document.getElementById('posts').innerHTML = template
}
function _drawFeaturedPost() {
  const post = ProxyState.featuredPost
  const template = getFeaturedPostTemplate(post)
  document.getElementById('featured').innerHTML = template
}

export class PostsController {
  constructor() {
    this.getAllPosts()
    ProxyState.on('posts', _drawPosts)
    ProxyState.on('featuredPost', _drawFeaturedPost)
  }

  async getAllPosts() {
    try {
      await postsService.getAllPosts()
    } catch (error) {
      logger.error('[Get All Posts Error]', error.message)
    }
  }

  async getPostById(id) {
    try {
      await postsService.getPostById(id)
    } catch (error) {
      logger.error('[GET Post By Id Error]', error.message)
    }
  }

  async getKing() {
    try {
      await postsService.getKing()
    } catch (error) {
      logger.error('[GET King Error]', error.message)
    }
  }

  async createPost(id) {
    try {
      window.event.preventDefault()
      const formElem = window.event.target
      const postData = {
        title: formElem.title.value,
        content: formElem.content.value,
        imgUrl: formElem.imgUrl.value
      }
      if (id) {
        await postsService.updatePost(postData, id)
      } else {
        await postsService.createPost(postData)
      }
      formElem.reset()
    } catch (error) {
      logger.error('[CREATE POST ERROR]', error.message)
    }
  }

  async vote(id, voteStr) {
    try {
      await postsService.vote(id, voteStr)
    } catch (error) {
      logger.error('[VOTE ERROR]', error.message)
    }
  }

  async openEditModal(id) {
    const post = ProxyState.posts.find(p => p.id === id)

    document.getElementById('modal-body-slot').innerHTML = getPostForm(post)
    // open the modal
    // eslint-disable-next-line no-undef
    bootstrap.Modal.getOrCreateInstance(document.getElementById('form-modal')).toggle()
  }

  async openCreateModal() {
    document.getElementById('modal-body-slot').innerHTML = getPostForm()
    // eslint-disable-next-line no-undef
    bootstrap.Modal.getOrCreateInstance(document.getElementById('form-modal')).toggle()
  }

  async deletePost(id) {
    try {
      await postsService.deletePost(id)
    } catch (error) {
      logger.error('[Delete Post Error]', error.message)
    }
  }
}
