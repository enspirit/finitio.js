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
