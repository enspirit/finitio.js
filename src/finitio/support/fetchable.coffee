$u = require './utils'

module.exports = (clazz, plural, singular, extractor)->
  singular  ?= plural.slice(0, plural.length-1)
  extractor ?= (name)-> this[plural][name]

  clazz.prototype.fetch = (name, callback)->
    extracted = extractor.bind(this)(name)
    if extracted?
      return extracted
    else if callback?
      callback(this, name)
    else
      throw new Error("No such #{singular} `#{name}`")

  clazz.prototype.fetchPath = (path, callback)->
    f = $u.inject path.split('/'), this, (memo, name)->
      memo && memo.fetch && memo.fetch(name, ()-> null)
    if f?
      f
    else if callback?
      callback()
    else
      throw new Error("No such #{singular} `#{path}`")
