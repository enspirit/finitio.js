Qjs = require '../../lib/qjs'

TestSystem = Qjs.parse """
  # Nil & others
  Any = .
  Nil = .( v | v === null )

  # Booleans
  True    = .( b | b === true )
  False   = .( b | b === false )
  Boolean = .Boolean

  # Numerics
  Numeric = .Number
  Integer = .Number( i | noDot: i.toString().indexOf('.') == -1 )

  # String
  String  = .String

  # Dates and Time
  Date = .Date <iso8601> .String \( n | Date(n)     )
                                 \( d | d.getTime() )
  """
module.exports = TestSystem
