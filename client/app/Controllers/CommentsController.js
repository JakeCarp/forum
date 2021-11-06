import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'
import { getCommentsForm } from '../Forms/GetCommentsForm.js'

function _drawComments() {
  const comments = ProxyState.comments
  const postId = comments[0].postId
  let template = ''
  comments.forEach(c => { template += c.Template })
  document.getElementById(`comments-${postId}`).innerHTML = template
}

export class CommentsController {
  constructor() {
    ProxyState.on('comments', _drawComments)
  }

  async getAllComments(query = '') {
    //   TODO need to connect to the button and attach an id string
    try {
      await commentsService.getAllComments(query)
    } catch (error) {
      logger.error(error.message)
    }
  }

  async createComment(id) {
    try {
      window.event.preventDefault()
      const formElem = window.event.target
      const commentData = {
        content: formElem.content.value,
        postId: formElem.postId.value
      }
      if (id) {
        await commentsService.updateComment(commentData, id)
      } else {
        await commentsService.createComment(commentData)
      }
      formElem.reset()
    } catch (error) {
      logger.error(error.message)
    }
  }

  async openCommentEditModal(id) {
    const comment = ProxyState.comments.find(c => c.id === id)
    document.getElementById('comment-body-slot').innerHTML = getCommentsForm(comment)
    // eslint-disable-next-line no-undef
    bootstrap.Modal.getOrCreateInstance(document.getElementById('form-modal')).toggle()
  }

  async deleteComment(id) {
    try {
      await commentsService.deleteComment(id)
    } catch (error) {
      logger.error(error.message)
    }
  }
}
