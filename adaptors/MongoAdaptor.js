/**
 * @file MongoAdaptor.js
 * Contains main service implementation.
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
  RESTAdaptor = require('./RESTAdaptor'),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

class MongoAdaptor extends RESTAdaptor{

  /**
   * Connects to Mongodb and executs a callback with reference to the db
   * @param  {Function} callback [description]
   */
  connect(callback){
    MongoClient.connect(
      'mongodb://' + this.config.host + ':' + this.config.port,
      (err, db) => {
        if (err) throw new Error(err)
        callback(db)
        db.close()
      }
    )
  }

  /**
   * @inheritDoc
   */
  get(request, response){
    var thisObject = this
    this.connect(
      (db) => {
        db.collection(thisObject.name).find(request.query).toArray( 
          (err, docs) => {
            if (err) throw new Error(err)
            console.log(docs)
            console.log('Responding to ' + JSON.stringify(request.query) + ' with ' + docs.length + ' documents')
            response.send(docs)
          }
        )
      }
    )
  }

  /**
   * @inheritDoc
   */
  post(request, response){}

}

module.exports = MongoAdaptor