factory = new (require '../support/factory')

#
# This module defines the same system as in "default.fio"
# but using Finitio' API
#
System = {}

#      Any       = .
System.Any       = factory.any("Any")

#      Null      = .( v | v === null )
System.Null      = factory.sub_type(System.Any, ((v) -> v == null)     , 'Null')

#      Undefined = .( v | v === undefined )
System.Undefined = factory.sub_type(System.Any, ((v) -> v == undefined), 'Undefined')

#      Boolean   = .Boolean
System.Boolean   = factory.builtin(Boolean)

#### Numbers

#      Number    = .Number
System.Number    = factory.builtin(Number)

#      Integer   = .Number( n | n % 1 === 0    )
System.Integer   = factory.sub_type(System.Number, ((n) -> n % 1 == 0), "Integer")
#      Real      = .Number( n | !(n % 1 === 0) )
System.Real      = factory.sub_type(System.Number, ((n) -> !(n % 1 == 0)), "Real")

# String         = .String
System.string    = factory.builtin(String)

#
# TODO: date
#

#
module.exports = System
