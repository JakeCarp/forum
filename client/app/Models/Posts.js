export class Post {
  constructor(data) {
    this.id = data._id
    this.title = data.title
    this.creatorId = data.creatorId
    this.content = data.content
    this.upVotes = data.upVotes
    this.voteTotal = data.voteTotal
    this.imgUrl = data.imgUrl
  }

  get Template() {
    // TODO comments collapse Id = comments-this.id
    return 'This is a post'
  }
}
