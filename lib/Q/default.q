# Null & Undefined
Null        = .( v | v === null      )
Undefined   = .( v | v === undefined )

# Bool
Boolean     = .Boolean

# Numbers

Number      = .Number
Integer     = .Number( i | i.toString().indexOf('.') == -1 )
Real        = .Number( r | r.toString().indexOf('.') != -1 )

# String

String      = .String

# Date

Date        = .Date <timestamp> .Number \( n | Date(n)     )
                                        \( d | d.getTime() )