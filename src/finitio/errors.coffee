$u = require('./support/utils')

class TypeError extends Error

  constructor: (info) ->
    $u.extend(this, info)
    @message = computeMessage(this)
    super(@message, @rootCause)

  Object.defineProperty @prototype, 'causes',
    get: ()->
      @causesCache ?= @children && computeCauses(this)

  Object.defineProperty @prototype, 'cause',
    get: ()->
      @causes && @causes[0]

  Object.defineProperty @prototype, 'rootCauses',
    get: ()->
      @rootCausesCache ?= computeRootCauses(this, [])

  Object.defineProperty @prototype, 'rootCause',
    get: ()->
      @rootCauses[@rootCauses.length - 1]

  debug: ()->
    str = "[#{@location}] #{@message}\n"
    if @rootCauses
      for c in @rootCauses
        str += "  [#{c.location}] #{c.message}\n"
    str

  debugTree: (depth)->
    str = ''
    depth ?= 0
    for i in [0...depth]
      str += "  "
    if @location?
      str += "[#{@location}] #{@message}\n"
    else
      str += "#{@message}\n"
    if @causes?
      for c in @causes
        str += c.debugTree(depth+1)
    str

computeMessage = (info)->
  msg = info.error
  if msg instanceof Array
    [msg, data] = msg
    i = -1
    msg.replace /\$\{([a-zA-Z]+)\}/g, (match)=>
      i += 1
      param = match.slice(2, match.length-1)
      $u.toString(info[param] || data[i])
  else
    msg

computeCauses = (error)->
  $u.map error.children, (c)->
    c.location = appendPath(error.location, c.location)
    new TypeError(c)

computeRootCauses = (error, cache)->
  if error.causes
    $u.each error.causes, (cause)->
      computeRootCauses(cause, cache)
  else
    cache.push(error)
  cache

appendPath = (parent, child)->
  return parent unless child?
  return child  unless parent?
  parent + '/' + child

module.exports =
  TypeError: TypeError
