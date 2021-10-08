const {conversations, users, participants, messages} = require('../models');

class ConversationsServices {
  static async getAll () {
    try {
      return await conversations.findAll();
    } catch (error) {
      throw error;
    }
  }
  static async getById (id) {
    try {
      const user = await conversations.findByPk(id);
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
      return await conversations.create(obj)
    } catch (error) {
      throw error;
    }
  }
  static async update (id, obj) {
    try {
      return await conversations.update(obj, {where: {id}}) 
    } catch (error) {
      throw error
    }
  }
  static async delete (id) {
    try {
      return await conversations.destroy({where: {id}}) 
    } catch (error) {
      throw error
    }
  }

  static async joinUsers (id) {
    try {
      const result = await conversations.findOne({
        where: {id},
        include: [{
          model: users,
          as: 'created_by_user'
        }]
      });
      return result;
    } catch (error) {
      throw error
    }
  }

  static async joinParticipants (id) {
    try {
      const result = await conversations.findAll({
        where: {id},
        attributes: {
          exclude: ['created_by', 'created_at', 'updated_at']
        },
        include: [{
          model: participants,
          as: 'participants',
          include: {
            attributes: ['id'],
            model: users,
            as: 'user'
          }
        }]
      });
      return result;
    } catch (error) {
      throw error
    }
  }

  static async joinMessages (id) {
    try {
      const result = await conversations.findAll({
        where: {id},
        include: {
          model: messages,
          as: 'messages'
        }
      });
    } catch (error) {
      throw error
    }
  }
}

module.exports = ConversationsServices;