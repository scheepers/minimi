/**
 * @file MongoWrapper.js
 * MongoDB service wrapper
 *
 * Requires host and port attributes to be set schema section of config.json:
 *
 * "mongo-example": {
 *   "wrapper": "MongoWrapper",
 *   "host": "localhost",
 *   "port": 27017
 * }
 *
 */

"use strict";

const
  RestWrapper = require('./RestWrapper'),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert')

class MongoWrapper extends RestWrapper{

  /**
   * @inherit
   */
  constructor(minimi, name, schema){
    super(minimi, name, schema)
  }

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
    if (request.query && Object.keys(request.query).length)
      this.connect(
        (db) => {
          db.collection(thisObject.name).find(request.query).toArray(
            (err, docs) => {
              console.log('Responding to ' + JSON.stringify(request.query))
              if (err) throw new Error(err)
              response.send(docs)
              db.close()
              console.log('Responded to ' + JSON.stringify(request.query) + ' with ' + docs.length + ' documents')
            }
          )
        }
      )
    else return super.get(request, response)
  }

  /**
   * @inheritDoc
   */
  post(request, response){
    var thisObject = this
    this.connect(
      (db) => {
        db.collection(thisObject.name).insertMany(
          [request.body],
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

module.exports = MongoWrapper