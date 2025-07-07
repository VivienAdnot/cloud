const axios = require('axios');

const handler = async () => {

  var config = {
    method: 'get',
    url: 'https://dev.connect.deepreach.com/v1/campaigns/50132/state',
    headers: { 
      'x-api-key': '1Ltq7hkJFi21TY3kioVAD6GuQHvw9wfc4kxT1LSY'
    }
  };

  let response;
  try {
    response = await axios(config);
    console.log('response success', response.data);
  }
  catch (error) {
    console.log('response error', error);

    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response.data)
  };
};

module.exports = { handler };