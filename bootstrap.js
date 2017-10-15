/**
 * @file bootstrap.js
 * Contains service bootstrapping code.
 */

"use strict";

const
  express = require('express'),
  fs = require('fs'),
  path = require('path')

class  Bootstrap {

  /**
   * Bootstraps e new service instance.
   */
  constructor(){
    process.chdir(path.normalize(__dirname))
    this.config = require('./config.json')
    this.app = express()
    this.adaptors = {}
    this.loadSchemas()
    this.start()
  }

  /**
   * Loads all schemas in the schemas folder
   */
  loadSchemas(){
    var thisObject = this
    fs.readdir(
      'schemata',
      (err, files) => {
        if (err) throw new Error(err)
        for(var i in files){
          var 
            name = path.basename(files[i], '.json'),
            Adaptor = thisObject.config.schemata[name]
              ? require('./adaptors/' + thisObject.config.schemata[name].adaptor)
              : require('./adaptors/RESTAdaptor')
          thisObject.create(
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
  create(Adaptor, name, schema) {
    this.adaptors[name] = new Adaptor(
      this,
      name,
      schema
    )
  }

  /**
   * Start the service
   */
  start(){
    this.app.listen(
      this.config.port, 
      () => { console.log('minimi on ' + this.config.port) }
    )
  }
}

new Bootstrap()