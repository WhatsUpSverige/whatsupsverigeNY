const { insertUnknownCity } = require('../utils/database');

exports.handler = async (event) => {
  const { city } = JSON.parse(event.body);

  try {
    await insertUnknownCity(city);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'City logged successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to log city', error: error.message }),
    };
  }
};
