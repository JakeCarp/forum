import { Comment } from '../Models/Comment.js'

export function getCommetForm(commenttData) {
  const comment = new Comment(commenttData)
  return `
    <label for="content" class="form-label">Content</label>
    <textarea name="content" id="content" aria-dexribedby="content" placeholder="Text..." value=${comment.content}>`
}
