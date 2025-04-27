const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

async function insertUnknownCity(city) {
  await client.query('INSERT INTO unknown_cities (city) VALUES ($1)', [city]);
}

module.exports = { insertUnknownCity };
