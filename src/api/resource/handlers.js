const models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getResource = async (req, h) => {
  try {
    const resourceId = req.params.id;

    if (!resourceId) {
      throw new Error('You need to provide an id');
    }

    const resource = await models.Resource.findByPk(resourceId);
    if (!resource) {
      throw new Error('Resource no found');
    }
    // h.response({ hola }).type('application/json');
    return h.response({ hola: "" });
  } catch (err) {
    h.response({ error: err.message }).code(201);
  }
};

const getResources = async (req, h) => {
  const { name, code } = req.query;
  const where = {};
  const attributes = ['id', 'name', 'description', 'type', 'createdAt', 'updatedAt'];
  if (name) {
    where.name = { [Op.iLike]: `%${name}%` };
  }
  if (code) {
    where.code = code;
    attributes.push('url', 'code');
  }
  try {
    const resources = await models.Resource.findAll({
      where,
      attributes
    });
    return h.response(resources);
  } catch (err) {
    return h.response({ error: err.message }).code(400);
  }
};

module.exports = { getResources, getResource };
