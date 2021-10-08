const UserServices = require('../services/users.services.js')

const getAllUsers = async (rq, rp, next) => {
  try {
    const data = await UserServices.getAll();
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const getUserById = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const data = await UserServices.getById(id);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const createUser = async (rq, rp, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      profile_image,
      phone
    } = rq.body;
    const newUser = {
      firstname,
      lastname,
      email,
      password,
      profile_image,
      phone
    }
    const data = await UserServices.create(newUser);
    return rp.status(202).json(data);
  } catch (error) {
    next(error);
  }
}

const updateUser = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const {firstname, lastname, email, password, profile_image, phone} = rq.body;
    const user = rq.user;
    const updatedUser = {
      firstname, lastname, email, password, profile_image, phone
    }
    const data = await UserServices.update(user, id, updatedUser);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const user = rq.user;
    const data = await UserServices.delete(user, id);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}