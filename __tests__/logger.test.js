'use strict';

const logger = require('../src/middleware/logger');

describe('LoggerTesting', () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn(); // mocking the next method for testing
  beforeEach(() => {
    // attach a mock to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    //removeSpy
    consoleSpy.mockRestore();
  });

  it('adds a timestamp', () => {
    logger(req, res, next);
    expect(req.timestamp).toBeTruthy();
    expect(req.timestamp).toBeInstanceOf(Date);
    expect(typeof (req.timestamp)).toEqual('object');
  });

  it('logs as expected', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalledWith('logged at', req.timestamp);
  });

  it('calls next as expected', async () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
