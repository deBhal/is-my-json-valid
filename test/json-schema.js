var tape = require('tape')
var fs = require('fs')
var validator = require('../')

var readDir = function(dir, {excluding} = {excluding: []}) {
  return fs.readdirSync(__dirname+'/'+dir)
    .filter(file => ! (Array.isArray(excluding) && excluding.includes(file)))
    .map(file => './'+dir+'/'+file)
}

var loadAndRunTests = suiteName =>
  fileName => require(fileName)
    .forEach(f =>
      tape(suiteName+' '+f.description, t => {
        var validate = validator(f.schema)
        f.tests.forEach(function(test) {
          t.same(validate(test.data), test.valid, test.description)
        })
        t.end()
      })
    )

readDir('json-schema-draft4', {excluding: ['definitions.json', 'refRemote.json']})
  .forEach(loadAndRunTests('json-schema-test-suite'))

readDir('extra')
  .forEach(loadAndRunTests('extra-test-suite'))
