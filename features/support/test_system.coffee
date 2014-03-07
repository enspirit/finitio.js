Qjs = require '../../lib/qjs'

source = """
  # Nil & others
  Any = .
  Nil = .( v | v === null )

  # Booleans
  True    = .( b | b === true )
  False   = .( b | b === false )
  Boolean = .Boolean

  # Numerics
  Numeric = .Number
  Real    = .Number( n | !(n % 1 === 0) )
  Integer = .Number( n | n % 1 === 0    )

  # String
  String  = .String

  # Dates and Time
  Date = .Date <iso8601> .String .Qjs.Contracts.Date.iso8601
  """
TestSystem = Qjs.parse(source, world: { Qjs: Qjs })

module.exports = TestSystem
