const Log = require('@dazn/lambda-powertools-logger')
const db = require('./db');

const statusCodes = {
  BAD_PARAMETERS: 400,
  CREATED_OR_UPDATED: 201, // in http strict mode, updated should have a separate code
  SUCCESS: 200,
  DELETED: 204,
}

// global variable, do not mutate
const headers = {
  'Content-Type': 'application/json'
}

const createOrUpdate = async (event) => {
  let body;
  let statusCode = statusCodes.CREATED_OR_UPDATED;

  // parse json
  let item;
  try {
    item = JSON.parse(event.body);
  } catch (jsonParseError) {
    statusCode = statusCodes.BAD_PARAMETERS;
    const errorMessage = 'Could not json parse body'
    Log.error('createOrUpdate/error', { query: event.body }, new Error(errorMessage));
    body = errorMessage;
    return {
      statusCode,
      body,
      headers
    };
  }

  try {
    const itemCreated = await db.store(item);
    Log.info('createOrUpdate/new item stored', {
      query: { item },
      data: itemCreated,
      context: { statusCode }
    });
    body = itemCreated;
  } catch (err) {
    Log.error('createOrUpdate/error', { query: item}, err);
    statusCode = statusCodes.BAD_PARAMETERS;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

const getAll = async () => {
  let body;
  let statusCode = statusCodes.SUCCESS;

  try {
    const allItems = await db.list();
    Log.info('getAll/all items', {
      data: allItems,
      context: { statusCode }
    });
    body = allItems;
  } catch (err) {
    Log.error('getAll/error', err);
    statusCode = statusCodes.BAD_PARAMETERS;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

const getById = async (event) => {
  const itemId = event.pathParameters.id;
  let body;
  let statusCode = statusCodes.SUCCESS;

  try {
    const itemFound = await db.getById(itemId);
    Log.info('getById/item found', {
      query: { itemId },
      data: itemFound,
      context: { statusCode }
    });
    body = itemFound;
  } catch (err) {
    Log.error('getById/error', { query: itemId }, err);
    statusCode = statusCodes.BAD_PARAMETERS;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

const deleteById = async (event) => {
  const itemId = event.pathParameters.id;
  let body;
  let statusCode = statusCodes.DELETED;

  try {
    const itemDeletedInfo = await db.deleteById(itemId);
    Log.info('deleteById/result', {
      query: { itemId },
      data: itemDeletedInfo,
      context: { statusCode }
    });
    body = itemDeletedInfo
  } catch (err) {
    Log.error('deleteById/error', { query: itemId }, err);
    statusCode = statusCodes.BAD_PARAMETERS;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

module.exports = {
  createOrUpdate,
  getAll,
  getById,
  deleteById
}