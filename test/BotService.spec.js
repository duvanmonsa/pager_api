const { expect } = require('chai');

const BotService = require('../src/services/BotService');

describe('BotService', () => {
  it('Should do nothing', async () => {
    const result = await BotService.processMessage('Hi!');
    expect(result).to.be.eq(false);
  });
  it('Should return no exist', async () => {
    let error;
    try {
      await BotService.processMessage('/anything=hi');
    } catch (err) {
      error = err;
    }

    expect(error).to.exist;
    expect(error.text).to.be.eq("Command doesn't exist");
  });
  it('Should return no quote', async () => {
    let error;
    try {
      await BotService.processMessage('/stock=hi');
    } catch (err) {
      error = err;
    }

    expect(error).to.exist;
    expect(error.text).to.be.eq('No quote for that stock');
  });
  it('Should return a quote', async () => {
    let error;
    let result;
    try {
      result = await BotService.processMessage('/stock=aapl.us');
    } catch (err) {
      error = err;
    }

    expect(error).to.not.exist;
    expect(result).to.exist;
    expect(result.text).to.exist;
    expect(result.User.name).to.be.eq('ChatBot');
  });
});
