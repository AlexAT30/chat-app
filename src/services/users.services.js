const {users} = require('../models');

class UserService {
  static async getAll () {
    try {
      return await users.findAll({
        attributes: {
          exclude: ['password']
        }
      });
    } catch (error) {
      throw error;
    }
  }
  static async getById (id) {
    try {
      const user = await users.findByPk(id, {
        attributes: {
          exclude: ['password']
        }
      });
      if(user) {
        return user;
      }
      return {};
    } catch (error) {
      throw error;
    }
  }
  static async create (obj) {
    try {
      const newUser = await users.create(obj);
      return await this.getById(newUser.id);
    } catch (error) {
      throw error;
    }
  }
  static async update (user, id, obj) {
    try {
      const userAuth = await this.getById(id);
      if (user.email === userAuth.email) {
        try {
          const valid = await users.update(obj, {where: {id}});
          if (valid[0]) {
            const user = await this.getById(id);
            return {
              message: 'User updated successfully',
              user
            };
          }
          return {
            message: 'User could not be updated'
          };
        } catch (error) {
          throw error
        }
      }
      return {
        message: 'you dont have the necessary permissions'
      };
    } catch (error) {
      throw error;
    }
  }
  static async delete (user, id) {
    try {
      const userAuth = await this.getById(id);
      if (user.email === userAuth.email) {
        try {
          const valid = await users.destroy({where: {id}});
          if (valid) {
            return {message: 'User deleted successfully'};
          }
          return {message: 'User could not be removed'};
        } catch (error) {
          throw error
        }
      }
      return {
        message: 'you dont have the necessary permissions'
      };
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserService;