import { User } from '../Model/User.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/myApp');

const users = [
  new User({ userName: 'pranshu', password: '1234' }),
  new User({ userName: 'shivam', password: '123456' }),
  new User({ userName: 'prakhar', password: '00234' }),
  new User({ userName: 'rizwan', password: '12347' }),
  new User({ userName: 'tanay', password: '1234124', role: 'admin' }),
];

for (let user of users) {
  try {
    await user.save();
  } catch (e) {
    console.log(e);
  }
}
mongoose.disconnect();
