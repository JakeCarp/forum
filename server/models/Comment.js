import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CommentSchema = new Schema({
  content: { type: String, maxlength: 500 },
  creatorId: { type: ObjectId, ref: 'Profile' },
  postId: { type: ObjectId, ref: 'Post' }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

CommentSchema.virtual('post', {
  localField: 'postId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
