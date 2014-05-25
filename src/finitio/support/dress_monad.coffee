class DressMonad

  constructor: (@result, @failure)->

  @success: (result)->
    new DressMonad result, undefined

  @failure: (context, error, causes)->
    failure = { context: context, error: error }
    failure.children = causes if causes?
    new DressMonad undefined, failure

  @find: (collection, callback, onFailure)->
    causes = []
    for i in [0...collection.length]
      m = callback(collection[i], i)
      if m.isSuccess()
        return m
      else
        m.failure.location = i
        causes.push(m.failure)
    onFailure(causes)

  @refine: (base, collection, callback, onFailure)->
    if base.isSuccess()
      causes = []
      for i in [0...collection.length]
        m = callback(base, collection[i], i)
        if m.isFailure()
          m.failure.location = i
          causes.push(m.failure)
      return base if causes.length == 0
      onFailure(causes)
    else
      onFailure([base.failure])

  @map: (collection, mapper, onFailure)->
    result  = []
    success = @success result
    callback = (_, elm, index)->
      m = mapper(elm, index)
      m.onSuccess (elmResult)->
        result.push(elmResult)
        m
    @refine success, collection, callback, onFailure

  isSuccess: ()->
    @failure is undefined

  isFailure: ()->
    not @isSuccess()

  onSuccess: (callback)->
    return this unless @isSuccess()
    callback(@result)

  onFailure: (callback)->
    return this if @isSuccess()
    callback(@failure)

module.exports = DressMonad
