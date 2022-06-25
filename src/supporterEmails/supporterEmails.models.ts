import mongoose from 'mongoose'

export class SupporterEmailsModels {

  private static AttachmentSchema = new mongoose.Schema({
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    email: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'email' }
  })
  Attachment = mongoose.model('attachment', SupporterEmailsModels.AttachmentSchema)


  private static EmailSchema = new mongoose.Schema({
    date_created: { type: Date, default: new Date() },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    sent: { type: Boolean, default: false },
    supporter: { type: mongoose.Schema.Types.ObjectId },
    room: { type: mongoose.Schema.Types.ObjectId }
  })
  Email = mongoose.model('email', SupporterEmailsModels.EmailSchema)

}
