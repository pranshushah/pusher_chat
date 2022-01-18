import { model, Schema } from 'mongoose';
import { Password } from '../utils/Password.js';

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: [true, 'user name is required.'],
			validate: {
				validator(userName) {
					return userName.length > 1;
				},
				message(message) {
					return `${message.value} is not valid userName`;
				},
			},
		},
		password: {
			type: String,
			required: [true, 'password is required'],
		},
		salt: {
			type: String,
			required: [true, 'salt is required'],
		},
		tokenVersion: {
			type: Number,
			default: 0,
		},
		socketTokenVersion: {
			type: Number,
			default: 0,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{
		// to convert returning object as we want
		toJSON: {
			versionKey: false,
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret.salt;
				delete ret.password;
				delete ret._id;
			},
		},
	},
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const { hashedPassword, salt } = await Password.toHash(this.get('password'));
		this.set('password', hashedPassword);
		this.set('salt', salt);
		// here calling this manually because we are setting validateBeforeSave to false.
		await this.validate();
	}
	done();
});
// doing this because throwing error for not having salt, will call validation manually in pre hook
userSchema.set('validateBeforeSave', false);

const User = model('User', userSchema);

export { User };
