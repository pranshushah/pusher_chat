import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
const asyncScrypt = promisify(scrypt);

export class Password {
  static async toHash(password) {
    const salt = randomBytes(8).toString('hex');
    const buf = await asyncScrypt(password, salt, 64);
    return { hashedPassword: buf.toString('hex'), salt };
  }
  static async compare(storedPassword, storedSalt, suppliedPassword) {
    const buf = await asyncScrypt(suppliedPassword, storedSalt, 64);
    return buf.toString('hex') === storedPassword;
  }
}
