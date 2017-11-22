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
    this.wrappers = {}

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

    fs.readdir('schema',

      (err, files) => {
        if (err) throw new Error(err)

        for(var i in files){

          var
            schemaName = path.basename(files[i], '.json'),
            wrapperName = thisObject.config.schema[schemaName] ? thisObject.config.schema[schemaName].wrapper : false || 'RestWrapper',
            Wrapper = require('./wrappers/' + wrapperName)

          console.log('Connecting ' + schemaName + ' to ' + wrapperName)
          thisObject.connect(
            Wrapper,
            schemaName,
            require('./schema/' + files[i])
          )
        }

        console.log('Schemata online')
      }
    )
  }

  /**
   * Connect an adapter to a schema
   * @param  object schema controller
   * @param  string schema name
   * @param  object schema object
   */
  connect(Wrapper, name, schema) {
    this.emit('connecting', this, Wrapper, name, schema)

    this.wrappers[name] = new Wrapper(
      this,
      name,
      schema
    )

    this.emit('connected', this, this.wrappers[name], name, schema)
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