const Sequelize = require('sequelize');
const shortid = require('shortid');

const models = require('../../models');

const Op = Sequelize.Op;

const getResource = async (req, h) => {
  try {
    const resourceId = req.params.id;
    const resource = await models.Resource.findByPk(resourceId);
    if (!resource) {
      return h.response({ error: 'Resource no found' }).code(500);
    }
    return h.response(resource);
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

    const newResource = await models.Resource.create(resource);
    if (!newResource) {
      return h.response({ error: 'Resource no created' }).code(500);
    }
    return h.response(newResource);
  } catch (err) {
    h.response({ error: err.message }).code(201);
  }
};

const updateResource = async (req, h) => {
  try {
    const resourceId = req.params.id;
    const resource = req.payload;

    const currentResource = await models.Resource.findByPk(resourceId);
    if (!currentResource) {
      return h.response({ error: 'Resource no found' }).code(500);
    }

    await currentResource.update(resource);

    return h.response(currentResource);
  } catch (err) {
    h.response({ error: err.message }).code(201);
  }
};

const deleteResource = async (req, h) => {
  try {
    const resourceId = req.params.id;

    const resource = await models.Resource.findByPk(resourceId);
    if (!resource) {
      return h.response({ error: 'Resource no found' }).code(500);
    }
    await resource.destroy();
    return h.response({ successful: true });
  } catch (err) {
    h.response({ error: err.message }).code(201);
  }
};

module.exports = { getResources, getResource, createResource, updateResource, deleteResource };
