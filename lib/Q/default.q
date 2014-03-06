# Null & Undefined
Null        = .( v | v === null      )
Undefined   = .( v | v === undefined )

# Bool
Boolean     = .Boolean

# Numbers

Number      = .Number

# String

String      = .String

# Date

Date        = .Date <timestamp> .Number \( n | Date(n)     )
                                        \( d | d.getTime() )