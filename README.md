# minimi

minimal microminion implementation


## System requirements

1. NodeJS


## Install

In the root of minimi, run:
```
npm install
```


## Configure

minimi exposes a microminion per JSON schema declared in
[config.json](./config.json).

```
{

	"name": "example minimi instance",
	"port": 3000,

	"schema": {

		"schema-name": {
			"Minion": "MySchemaMinion",
		}

	}

}
```


## Start

From the folder containing minimi, run:
```
node minimi
```


## Request

Make requests to schema at:
```
http://localhost:3000/schema-name
```

Requests are responded to in the following manner:
* GET Accept=json/schema - schema [JSON].
* GET Accept=application/json - request url parameters [JSON].
* GET Accept=[everything else] - form body [HTML].
* DELETE - request url parameters [JSON].
* POST and PUT - request body as [JSON].
* PATCH - both request url parameters and body [JSON].

Apart from testing HTTP requests, this is not particularly useful in itself.

The idea is to extend the JsonMinion into more interesting Minions, as per the
[MongoMinion](./minions/MongoMinion.js) that stashs entities in a MongoDB:
* GET Accept=json/schema - schema as [JSON]. Inherited.
* GET Accept=application/json - an array of all stashd entities [JSON].
* GET Accept=[everything else] - form body [HTML]. Inherited.
* DELETE - removes an entity that matches the url parameters.
* POST - creates a new entity represented by the request body.
* PUT - overwrites a entity matching the request url paramters with the entity
  represented by the request body.
* PATCH - updates fields within.

## Extend

[MongoMinion](./minions/MongoMinion.js) is an example of extending the
[RestMinion](./minions/RestMinion.js).

With a local MongoDB minion running and an example
[config.json](./config.json):
```
{

	"name": "example",
	"port": 3000,

	"schema": {

		"user": {
			"Minion": "MongoMinion",
			"host": "localhost",
			"port": 27017
		}

	}

}
```

User entities may be persisted, retrieved, updated and deleted within a stash
with the same name as the schema.

Visit:
```
http://localhost:3000/schema-name
```
to view an HTML form generated using
[json-schema-form-js](https://www.npmjs.com/package/json-schema-form-js) based
on the schema.

TODO: Add validation


## Reference

http://json-schema.org/