import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const PostSchema = new Schema({
  title: { type: String, maxlength: 100, required: true },
  content: { type: String, maxlength: 1000 },
  imgUrl: { type: String },
  votes: { type: Number, required: true, default: 0 },
  creatorId: { type: ObjectId, ref: 'Profile' }

}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
