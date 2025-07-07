const AWS = require("aws-sdk");

const { DYNAMO_ENDPOINT } = process.env;

const dynamoOpts = { region: "eu-west-3" };

if (DYNAMO_ENDPOINT) {
  dynamoOpts.endpoint = DYNAMO_ENDPOINT;
}

const db = new AWS.DynamoDB(dynamoOpts);
console.log(db);

module.exports = db;
