import mongoose from 'mongoose'
const { Schema } = mongoose

const notificationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    quoteId: 
      {
          type: Schema.Types.ObjectId,
          ref: 'Quote',

      },
    type:  Schema.Types.String,
    isRead: {
      type: Schema.Types.Boolean,
      default: false

    }
    
    
  },
  { versionKey: false, timestamps: true },
)



const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
