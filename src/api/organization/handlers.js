const Sequelize = require('sequelize');
const shortid = require('shortid');

const models = require('../../models');

const Op = Sequelize.Op;

const getOrganizations = async (req, h) => {
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
    const organizations = await models.Organization.findAll({
      where,
      attributes
    });
    return h.response(organizations);
  } catch (err) {
    return h.response({ error: err.message }).code(400);
  }
};

const createOrganization = async (req, h) => {
  try {
    const organization = req.payload;
    organization.code = shortid.generate();

    const newOrganization = await models.Organization.create(organization);
    if (!newOrganization) {
      return h.response({ error: 'Organization no created' }).code(500);
    }
    return h.response(newOrganization);
  } catch (err) {
    h.response({ error: err.message }).code(201);
  }
};

const updateOrganization = async (req, h) => {
  try {
    const organizationId = req.params.id;
    const organization = req.payload;

    const currentOrganization = await models.Organization.findByPk(organizationId);
    if (!currentOrganization) {
      return h.response({ error: 'Organization no found' }).code(500);
    }

    await currentOrganization.update(organization);

    return h.response(currentOrganization);
  } catch (err) {
    h.response({ error: err.message }).code(201);
  }
};

const deleteOrganization = async (req, h) => {
  try {
    const organizationId = req.params.id;

    const organization = await models.Organization.findByPk(organizationId);
    if (!organization) {
      return h.response({ error: 'Organization no found' }).code(500);
    }
    await organization.destroy();
    return h.response({ successful: true });
  } catch (err) {
    h.response({ error: err.message }).code(201);
  }
};

module.exports = { getOrganizations, createOrganization, updateOrganization, deleteOrganization };
