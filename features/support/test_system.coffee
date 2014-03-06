Qjs = require '../../lib/qjs'

TestSystem = Qjs.parse """
  Boolean = .Boolean
  Number  = .Number
  Integer = .Number( i | noDot: i.toString().indexOf('.') == -1 )
  String  = .String
  """
module.exports = TestSystem
