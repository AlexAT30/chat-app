const ConversationsServices = require('../services/conversations.services');

const getAllConversations = async (rq, rp, next) => {
  try {
    const data = await ConversationsServices.getAll();
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const getConversationById = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const data = await ConversationsServices.getById(id);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const createConversation = async (rq, rp, next) => {
  try {
    const {
      title,
      image_url,
      type,
      created_by,
    } = rq.body;
    const newConversation = {
      title,
      image_url,
      type,
      created_by,
    };
    const data = await ConversationsServices.create(newConversation);
    return rp.status(202).json(data);
  } catch (error) {
    next(error);
  }
}

const updateConversation = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const {
      title,
      image_url,
      type,
      created_by,
    } = rq.body;
    const updatedConversation = {
      title,
      image_url,
      type,
      created_by,
    };
    const data = await ConversationsServices.update(id, updatedConversation);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const deleteConversation = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const data = await ConversationsServices.delete(id);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const conversationUsers = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const data = await ConversationsServices.joinUsers(id);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const conversationsParticipants = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const data = await ConversationsServices.joinParticipants(id);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

const conversationsMessages = async (rq, rp, next) => {
  try {
    const {id} = rq.params;
    const data = await ConversationsServices.joinMessages(id);
    return rp.json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll: getAllConversations,
  getById: getConversationById,
  create: createConversation,
  update: updateConversation,
  delete: deleteConversation,
  users: conversationUsers,
  participants: conversationsParticipants,
  messages: conversationsMessages
}