Finitio = require '../../lib/finitio'

source = """
  # Nil & others
  Any = .
  Nil = .( v | v === null )

  # Booleans
  Boolean = .Boolean
  True    = .Boolean( b | b === true )
  False   = .Boolean( b | b === false )

  # Numerics
  Numeric = .Number
  Real    = .Number( n | !(n % 1 === 0) )
  Integer = .Number( n | n % 1 === 0    )

  # String
  String  = .String

  # Dates and Time
  Date = .Date <iso8601> .String .Finitio.Contracts.Date.iso8601
  Time = .Date <iso8601> .String .Finitio.Contracts.Time.iso8601
  """
TestSystem = Finitio.parse(source, world: { Finitio: Finitio })

module.exports = TestSystem
