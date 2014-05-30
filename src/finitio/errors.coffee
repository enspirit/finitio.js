$u = require('./support/utils')

class TypeError extends Error

  constructor: (info) ->
    $u.extend(this, info)
    @message = computeMessage(this)
    super(@message, @rootCause)

  Object.defineProperty @prototype, 'locatedMessage',
    get: ()->
      if @location?
        "[#{@location}] #{@message}"
      else
        @message

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

  explain: ()->
    str = @locatedMessage + "\n"
    if @rootCauses
      for c in @rootCauses
        str += "  #{c.locatedMessage}\n"
    str

  explainTree: (depth)->
    str = ''
    depth ?= 0
    for i in [0...depth]
      str += "  "
    str += @locatedMessage + "\n"
    if @causes?
      for c in @causes
        str += c.explainTree(depth+1)
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
  else if typeof(msg) == 'string'
    msg
  else
    info.toString()

computeCauses = (error)->
  $u.map error.children, (c)->
    c.location = appendPath(error.location, c.location)
    if c instanceof TypeError
      c
    else if c instanceof Error
      new TypeError({ error: c.message, location: c.location })
    else
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
