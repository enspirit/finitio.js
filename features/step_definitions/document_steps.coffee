Qjs = require '../../lib/qjs'

module.exports = ->

  this.Given /^the document has been defined as follows:$/, (str, callback) =>
    @schema = Qjs.parse_schema(str)
    callback()
  
  this.Given /^I use the document schema to validate the following JSON doc:$/, (str, callback) ->
    doc = JSON.parse(str)
    try
      @result = @schema.from_q(doc)
    catch err
      @result = err
