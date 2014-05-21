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
