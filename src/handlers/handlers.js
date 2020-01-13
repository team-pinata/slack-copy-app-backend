import logger from '../logger';
import User from '../models/User';
import { reject, success } from './Response';

export const usersGET = async () => {
  try {
    return success({
      users: await User.findAll(),
    });
  } catch (err) {
    return reject(err);
  }
};

export const usersPOST = async (req) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
    });
    return success(undefined, {
      headers: {
        Location: `http://localhost:3000/users/${user.name}`,
      },
    });
  } catch (err) {
    logger.error(err);
    return reject(err);
  }
};
