import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    voteCount: { type: Number, required: true, default: 0 },
    topPoster: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export const ProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE if you want to make properties from the account public put them here
    topPoster: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
