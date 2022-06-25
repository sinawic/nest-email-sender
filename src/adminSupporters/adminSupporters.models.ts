import mongoose from 'mongoose'

export class AdminSupportersModels {

  private static SupporterSchema = new mongoose.Schema({
    date_created: { type: Date, default: new Date() },
    username: { type: String, required: true },
    password: String,
    active: { type: Boolean, default: true },
    room: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'room' }
  }).index({ username: 1 }, { unique: true })

  Supporter = mongoose.model('supporter', AdminSupportersModels.SupporterSchema)

}
