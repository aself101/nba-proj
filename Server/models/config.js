/*******************************************************************************
  Main DB Config
*******************************************************************************/
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
// Required arg { useUnifiedTopology: true }
const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = client;


/* END */
