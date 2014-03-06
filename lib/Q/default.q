# Any
Any        = .

# Null & Undefined
Null        = .( v | v === null      )
Undefined   = .( v | v === undefined )

# Bool
Boolean     = .Boolean

# Numbers

Number      = .Number
Integer     = .Number( n | n % 1 === 0    )
Real        = .Number( n | !(n % 1 === 0) )

# String

String      = .String

# Date

Date        = .Date <timestamp> .Number \( n | Date(n)     )
                                        \( d | d.getTime() )