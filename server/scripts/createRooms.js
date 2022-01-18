import { Room } from '../Model/Rooms.js';
import { User } from '../Model/User.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/myApp');

(async function createRoom1() {
  try {
    const rizwan = await User.findOne({ userName: 'rizwan' });
    const prakhar = await User.findOne({ userName: 'prakhar' });
    const rizwanId = mongoose.Types.ObjectId(rizwan.id);
    const prakharId = mongoose.Types.ObjectId(prakhar.id);

    const room1 = new Room({ roomName: '512', members: [rizwanId, prakharId] });
    await room1.save();
  } catch (e) {
    console.log(e);
  }
})();

(async function createRoom2() {
  try {
    const pranshu = await User.findOne({ userName: 'pranshu' });
    const shivam = await User.findOne({ userName: 'shivam' });
    const pranshuId = mongoose.Types.ObjectId(pranshu.id);
    const shivamId = mongoose.Types.ObjectId(shivam.id);

    const room2 = new Room({
      roomName: '317',
      members: [pranshuId, shivamId],
    });
    await room2.save();
  } catch (e) {
    console.log(e);
  }
})();

mongoose.disconnect();
