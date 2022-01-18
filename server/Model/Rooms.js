import { model, Schema, Types } from 'mongoose';

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: [true, 'room name is required.'],
      validate: {
        validator(userName) {
          return userName.length > 1;
        },
        message(message) {
          return `${message.value} is not valid room name`;
        },
      },
    },
    members: {
      type: [Types.ObjectId],
      required: [true, 'please enter members'],
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
      },
    },
  },
);

const Room = model('Room', roomSchema);

export { Room };
