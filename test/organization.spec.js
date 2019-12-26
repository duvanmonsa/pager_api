'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { before, after, describe, it } = exports.lab = Lab.script();
const { init } = require('../src/server');

describe('GET /', () => {
  let server;
  before(async () => {
    server = await init();
  });
  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/'
    });
    expect(res.statusCode).to.equal(200);
  });
  it('List organizations', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/organization'
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.be.an.array();
    expect(res.result.length).to.equal(0);
  });

  const organization = {
    "name": "OrganizationNewName",
    "description": "This is the current desc for this organization",
    "type": "insurance",
    "url": "http://google.com",
  }
  let newOrganization;

  it('Create organization fail missing fields', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/organization',
      payload: {},
    });
    expect(res.statusCode).to.equal(400);
  });

  it('Create organization', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/organization',
      payload: organization,
    });
    newOrganization = res.result;
    expect(res.statusCode).to.equal(200);
    expect(res.result.name).to.equal(organization.name);
  });

  it('Get organization by name', async () => {
    const res = await server.inject({
      method: 'get',
      url: `/organization?name=${organization.name}`,
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result.length).to.equal(1);
  });

  it('Update organization', async () => {
    const description = 'New Description';
    const res = await server.inject({
      method: 'put',
      url: `/organization/${newOrganization.id}`,
      payload: {
        description
      }
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result.description).to.equal(description);
  });

  it('Delete organization', async () => {
    const res = await server.inject({
      method: 'delete',
      url: `/organization/${newOrganization.id}`,
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal({ successful: true });
  });
});