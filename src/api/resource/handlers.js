const Sequelize = require('sequelize');
const shortid = require('shortid');

const models = require('../../models');

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

const createResource = async (req, h) => {
  try {
    const resource = req.payload;
    resource.code = shortid.generate();

    if (!resource) {
      throw new Error('You need to provide resource data');
    }

    const newResource = await models.Resource.create(resource);
    if (!newResource) {
      throw new Error('Resource no created');
    }
    return h.response(newResource);
  } catch (err) {
    h.response({ error: err.message }).code(201);
  }
};

module.exports = { getResources, getResource, createResource };
