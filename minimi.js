/**
 * @file minimi.js
 * Contains minion bootstrapping code.
 */

"use strict";


const

  express = require('express'),
  fs = require('fs'),
  path = require('path'),
  parseError = require('express-body-parser-json-error')(),
  EventEmitter = require('events'),
  Minion = require('./core/Minion')


class Minimi extends EventEmitter {

  /**
   * Bootstraps a new minion instance.
   */
  constructor(){

    super()

    this.init()
    this.load()
    this.start()
  }

  /**
   * Initialises minimi.
   */
  init(){

    process.chdir(path.normalize(__dirname))

    this.config = require('./config.json')
    this.app = express()
    this.router = express.Router()
    this.minions = {}

    this.app.use(this.router)
    this.app.use(this.handleError)
    this.app.use(this.handleNotFound)

    console.log(
      'minimi [' +
      this.config.name + '] taking care of http://127.0.0.1:' +
      this.config.port +
      '\n'
    )
  }

  /**
   * Loads all minions defined in config.json
   */
  load(){
    for(var name in this.config.minions){
      this.delegate(name, this.config.minions[name])
    }
  }

  /**
   * Delegate a minion as per the provided configuration
   * @param  {string} name   Minion name
   * @param  {object} config Minion configuration
   */
  delegate(name, config){

    if (this.minions[name]) this.minions[name].destroy()
    if (config) this.config.minions[name] = config

    this.minions[name] = new Minion(
      name,
      this
    )
  }

  /**
   * Handle errors
   * @param  {object}   error    Error that has occured
   * @param  {object}   request  Express request object
   * @param  {object}   response Express response object
   * @param  {Function} next     Next middleware
   */
  handleError(error, request, response, next){
    console.log(error)
    if (error.expose) response.status(error.code || 500).json({"error": error})
  }

  /**
   * Handle not found
   * @param  {object}   request  Express request object
   * @param  {object}   response Express response object
   */
  handleNotFound(request, response){
    response.status(404).json({"error": 'Not found!'})
  }

  /**
   * Start the service.
   */
  start(){
    this.app.listen(
      this.config.port,
      () => {
        console.log('\nminimi [' + this.config.name + '] online\n')
      }
    )
  }
}

module.exports = new Minimi()