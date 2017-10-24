/**
 * @file MongoAdaptor.js
 * MongoDB service adaptor
 *
 * Requires host and port attributes to be set schemata section of config.json:
 *
 * "mongo-example": {
 *   "adaptor": "MongoAdaptor",
 *   "host": "localhost",
 *   "port": 27017
 * }
 *
 */

"use strict";

const
  jsonSchemaForm = require('json-schema-form-js'),
  RestAdaptor = require('./RestAdaptor'),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

class MongoAdaptor extends RestAdaptor{

  /**
   * Connects to Mongodb and executes a callback with reference to the db
   * @param  {Function} callback to call with a database
   */
  connect(callback){
    MongoClient.connect(
      'mongodb://' + this.config.host + ':' + this.config.port,
      (err, db) => {
        if (err) throw new Error(err)
        callback(db)
      }
    )
  }

  /**
   * @inheritDoc
   */
  get(request, response){
    var thisObject = this
    if (request.query.length)
      this.connect(
        (db) => {
          db.collection(thisObject.name).find(request.query).toArray(
            (err, docs) => {
              if (err) throw new Error(err)
              console.log('Responding to ' + JSON.stringify(request.query) + ' with ' + docs.length + ' documents')
              response.send(docs)
              db.close()
            }
          )
        }
      )
    else return jsonSchemaForm.render(this.schema)
  }

  /**
   * @inheritDoc
   */
  post(request, response){
    var thisObject = this
    this.connect(
      (db) => {
        db.collection(thisObject.name).insertMany(
          request.body,
          (err, result) => {
            if (err) throw new Error(err)
            response.send(result.ops)
            db.close()
          }
        )
      }
    )
  }

  /**
   * @inheritDoc
   */
  put(request, response){
    var thisObject = this
    this.connect(
      (db) => {
        db.collection(thisObject.name).updateOne(
          request.query,
          {$set: request.body},
          (err, result) => {
            if (err) throw new Error(err)
            response.send(result.ops)
            db.close()
          }
        )
      }
    )
  }

  /**
   * @inheritDoc
   */
  delete(request, response){
    var thisObject = this
    this.connect(
      (db) => {
        db.collection(thisObject.name).deleteOne(
          request.query,
          (err, result) => {
            if (err) throw new Error(err)
            response.send(result.result.n)
            db.close()
          }
        )
      }
    )
  }

  /**
   * @inheritDoc
   */
  patch(request, response){
    this.put(request, response)
  }

}

module.exports = MongoAdaptor