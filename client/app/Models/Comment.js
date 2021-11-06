export class Comment {
  constructor(data) {
    this.id = data._id
    this.content = data.content
    this.creatorId = data.creatorId
    this.postId = data.postId
  }

  get Template() {
    return 'This is a comment'
  }
}
