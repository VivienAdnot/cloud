const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// global variables, avoid this in production code !
const db = new AWS.DynamoDB.DocumentClient();

// in production, inject
const tableName = process.env.TABLE_NAME;

const store = async (item) => {
  const guid = uuidv4();
  const itemWithId = { id: guid, ...item };
  await db.put({
    TableName: tableName,
    Item: itemWithId
  }).promise();
  return itemWithId;
}

const list = async () => {
  return db.scan({ TableName: tableName }).promise();
};

const getById = async (id) => {
  return db.get({
    TableName: tableName,
    Key: { id }
  }).promise();
};

const deleteById = async (id) => {
  return db.delete({
    TableName: tableName,
    Key: { id }
  }).promise();
};

module.exports = { store, list, getById, deleteById }