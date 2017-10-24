/**
 * @file minimi.js
 * Contains service bootstrapping code.
 */

"use strict";

const
  express = require('express'),
  fs = require('fs'),
  path = require('path'),
  EventEmitter = require('events')

class  Minimi extends EventEmitter {

  /**
   * Bootstraps a new service instance.
   */
  constructor(){
    super()
    process.chdir(path.normalize(__dirname))

    this.config = require('./config.json')
    this.router = express()
    this.adaptors = {}

    this.loadSchemas()
    this.emit('strapping')
    this.start()
    this.emit('strapped')
  }

  /**
   * Loads all schemas in the schemas folder
   */
  loadSchemas(){
    var thisObject = this

    fs.readdir('schemata',

      (err, files) => {
        if (err) throw new Error(err)

        for(var i in files){

          var
            name = path.basename(files[i], '.json'),
            Adaptor = thisObject.config.schemata[name]
              ? require('./adaptors/' + thisObject.config.schemata[name].adaptor)
              : require('./adaptors/RESTAdaptor')

          thisObject.connect(
            Adaptor,
            name,
            require('./schemata/' + files[i])
          )
        }
      }
    )
  }

  /**
   * Connect an adapter to a schema
   * @param  object schema controller
   * @param  string schema name
   * @param  object schema object
   */
  connect(Adaptor, name, schema) {
    this.emit('connecting', this, Adaptor, name, schema)

    this.adaptors[name] = new Adaptor(
      this,
      name,
      schema
    )

    this.emit('connected', this, this.adaptors[name], name, schema)
  }

  /**
   * Start the service
   */
  start(){
    this.emit('starting', this)

    this.router.listen(
      this.config.port,

      () => {
        console.log('minimi responding on ' + this.config.port)
      }
    )

    this.emit('started', this)
  }
}

module.exports = new Minimi()