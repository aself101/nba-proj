/*******************************************************************************
  Main MongoDB class
  01/11/2020
*******************************************************************************/
const client = require('./config');

class MongoDB {
  constructor(db) {
    this.client = client;
    this.db = db;
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) reject(err);
        console.log('Connected Successfully to server!')
        resolve(client.db(this.db));
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      console.log('Disconnecting from server!');
      resolve(this.client.close());
    });
  }
  findAllDocuments({ col }) {
    return new Promise((resolve, reject) => {
      return this.client.db(this.db).collection(col).find({}).toArray((err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  }
  findDocumentByKeyVal({ col, key, val }) {
    return new Promise((resolve, reject) => {
      return this.client.db(this.db).collection(col).find({ [key]: val }).toArray((err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  }
  insertDocuments({ col, data }) {
    return new Promise((resolve, reject) => {
      return this.client.db(this.db).collection(col).insertMany(data, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  insertDocument({ col, data }) {
    return new Promise((resolve, reject) => {
      return this.client.db(this.db).collection(col).insertOne(data, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  updateDocument({ col, key, val, keyToUpdate, valToSet }) {
    return new Promise((resolve, reject) => {
      return this.client.db(this.db).collection(col).updateOne({ [key]: val },
        { $set: { [keyToUpdate]: valToSet } }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  removeDocument({ col, key, val }) {
    return new Promise((resolve, reject) => {
      return this.client.db(this.db).collection(col).deleteOne({ [key]: val }), ((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  indexCollection({ col, key, val }) {
    return new Promise((resolve, reject) => {
      return this.client.db(this.db).collection(col).createIndex({ [key]: val }), null, ((err, result) => {
        if (err) reject(err);
        console.log(result)
        resolve(result);
      });
    });
  }
}


module.exports = MongoDB;


















/* END */
