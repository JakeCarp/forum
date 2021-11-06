import { Post } from '../Models/Posts.js'

export function getPostForm(postData) {
  const post = new Post(postData)
  return `
    <label for="title" class="form-label">Title</label>
    <input type="text" name="title" id="title" aria-dexribedby="title" placeholder="Title..." value=${post.title}>`
}
