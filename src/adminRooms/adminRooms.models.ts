import mongoose from 'mongoose'

export class AdminRoomsModels {

  private static RoomSchema = new mongoose.Schema({
    date_created: { type: Date, default: new Date() },
    name: { type: String, required: true },
    email: { type: String, default: process.env.SOURCE_EMAIL },
    website: { type: String, required: true }
  }).index({ name: 1 }, { unique: true })

  static Room = mongoose.model('room', AdminRoomsModels.RoomSchema)

}
