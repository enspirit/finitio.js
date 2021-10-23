# 1.3.1  -- October 2021

Minor change:

* Upgrade grunt-mocha-test
# 1.3.0 -- February 2021

Major improvements:

* Add support for subsystem (`System#subsystem`)
* Add support for type "namespacing" (ex: `Person.ID = String`)

# 0.1.0 -- June 2014

Major improvements:

* Conformance to Finitio 0.4 (recursive types, metadata, imports)

Broken APIs:

* `Finitio.parse` no longer returns a System, but parses a source schema and
  returns the equivalent JSON information. Use `Finitio.system` instead.
* `System#parse` no longer exists. Use imports instead.
* `System` is now considered immutable. `addType` and similar methods have
  been removed accordingly.

# 0.0.1 -- March 2014

* Birthday
