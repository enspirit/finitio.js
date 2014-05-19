{
  if (!options.world) {
    options.world = {};
  }
  if (!options.system) {
    System = require('../system');
    options.system = new System();
  }
  if (!options.factory) {
    TypeFactory = require('../support/factory');
    options.factory = new TypeFactory(options.world);
  }
  Factory = options.factory;

  // converts head:X tail(... X)* to an array of Xs
  function headTailToArray(head, tail) {
    var result = (head ? [ head ] : []);
    for (var i = 0; i < tail.length; i++) {
      result[i+1] = tail[i][tail[i].length-1];
    }
    return result;
  }

  // compile an open expression given the varname for closing it
  function compileLambda(varname, expr) {
    var src = "x = function(" + varname + ")" + "{ return " + expr + "; }";
    try {
      return eval(src);
    } catch(e) {
      error("Syntax error in: `" + expr + "`");
    }
  }

  // compile a [ [n1, expr1], ... ] to an array of constraints
  function compileConstraints(varname, defs) {
    var cs = [];
    for (var i = 0; i < defs.length; i++) {
      var name = defs[i][0];
      var expr = defs[i][1];
      var fn   = compileLambda(varname, expr);
      cs[i] = Factory.constraint(name, fn);
    }
    return cs;
  }

  // Extract dress/undress function from `from`
  function extractExternalDressers(from) {
    if (from && from.dress instanceof Function && from.undress instanceof Function) {
      return [ from.dress, from.undress ];
    } else {
      error("Invalid information contractor `" + from + "`");
    }
  }

  // Extract dress/undress internal functions from `from`
  function extractInternalDressers(contractName, from) {
    if (from && from[contractName] instanceof Function) {
      var undName = 'to' + contractName.charAt(0).toUpperCase()
                         + contractName.slice(1);
      var undresser = function(value) {
        return value[undName]();
      }
      return [ from[contractName], undresser ];
    } else {
      error("Invalid information contractor `" + from + "`");
    }
  }

  // compile a [ name, type, [dress, undres]? ] to a contract representation
  function compileContract(c, jsType) {
    if (c[2] === null) {
      if (jsType) {
        c[2] = extractInternalDressers(c[0], jsType);
      } else {
        var identity = function(x){ return x; }
        c[2] = [ identity, identity ];
      }
    }
    return [ c[1], c[2][0], c[2][1] ];
  }

  // compile a [ [ name, type, [dress, undress]? ] ] to an object with
  // contracts by name
  function compileContracts(cs, jsType) {
    var contracts = {};
    for (var i = 0; i<cs.length; i++) {
      contracts[cs[i][0]] = compileContract(cs[i], jsType);
    }
    return contracts;
  }
}

// SYSTEM

system =
  definitions spacing m:type? spacing eof {
    if (m){ options.system.main = m }
    return options.system;
  }

definitions =
  (spacing type_def)*

type_def =
  n:type_name spacing '=' spacing t:type {
    t = Factory.alias(t, n)
    options.system.addType(t);
    return t;
  }

// TYPES (low priority)

type =
  union_type

union_type =
    head:sub_type tail:(pipe sub_type)+ {
      return Factory.union(headTailToArray(head, tail));
    }
  / sub_type

sub_type =
    t:rel_type c:constraint_fn {
      return Factory.sub_type(t, c)
    }
  / rel_type

constraint_fn =
  '(' spacing n:var_name pipe c:constraints spacing ')' {
    return compileConstraints(n, c)
  }

constraints =
    head:named_constraint tail:(opt_comma named_constraint)* opt_comma {
      return headTailToArray(head, tail);
    }
  / c:unnamed_constraint {
    return [c];
  }

named_constraint =
  n:constraint_name ':' spacing e:expression {
    return [n, e];
  }

unnamed_constraint =
  e:expression {
    return ['default', e];
  }

// TYPES (relational)

rel_type =
    relation_type
  / tuple_type
  / collection_type

tuple_type =
  '{' spacing h:heading spacing '}' {
    return Factory.tuple(h)
  }

relation_type =
  '{{' spacing h:heading spacing '}}' {
    return Factory.relation(h)
  }

heading =
    head:attribute? tail:(opt_comma attribute)* opt_comma d:dots? {
      var opts  = { allowExtra: (d ? true : false) };
      return Factory.heading(headTailToArray(head, tail), opts);
    }
  / spacing

attribute =
  n:attribute_name spacing ':' optional:'?'? spacing t:type {
    var required = (optional !== '?')
    return Factory.attribute(n, t, required)
  }

// TYPES (collections)

collection_type =
    set_type
  / seq_type
  / struct_type
  / term_type

set_type =
  '{' spacing t:type spacing '}' {
    return Factory.set(t)
  }

struct_type =
  '<' head:type tail:(opt_comma type)* opt_comma '>' {
    return Factory.struct(headTailToArray(head, tail));
  }

seq_type =
  '[' spacing t:type spacing ']' {
    return Factory.seq(t)
  }

// TYPES (higher priority)

term_type =
    ad_type
  / builtin_type
  / any_type
  / type_ref

ad_type =
  t:('.' builtin_type_name)? spacing cs:contracts {
    var jsType = (t) ? Factory.jsType(t[1]) : null;
    var contracts = compileContracts(cs, jsType);
    return Factory.adt(jsType, contracts);
  }

contracts =
  head:contract tail:(opt_comma contract)* opt_comma {
    return headTailToArray(head, tail);
  }

contract =
  '<' n:contract_name '>' spacing t:type spacing d:dressers? {
    return [ n, t, d ];
  }

dressers =
    '\\' up:lambda_expr spacing '\\' down:lambda_expr {
      return [ up, down ];
    }
  / '.' t:builtin_type_name {
    pair = Factory.jsType(t);
    return extractExternalDressers(pair);
  }

lambda_expr =
  '(' spacing n:var_name spacing '|' spacing e:expression spacing ')' {
    return compileLambda(n, e);
  }

any_type =
  '.' {
    return Factory.any();
  }

builtin_type =
  '.' name:builtin_type_name {
    return Factory.builtin(name);
  }

type_ref =
   n:type_name {
    return options.system.fetch(n);
  }

// EXPRESSIONS

expression =
  $((paren_expression / any_expression)+)

paren_expression =
  $('()' / '(' expression ')')

any_expression =
  $((![(,)] .)+)

// LEXER (names)

var_name =
  $([a-z]+)

contract_name =
  $([a-z] [a-z0-9]*)

constraint_name =
  $([a-z] [a-zA-Z_]*)

attribute_name =
  $([a-z] [a-zA-Z0-9_]*)

type_name =
  $([A-Z] [a-zA-Z.]*)

builtin_type_name =
  $([a-zA-Z0-9:.]+)

// LEXER (spacing, symbols and comments)

dots =
  $(spacing '...' spacing)

pipe =
  $(spacing '|' spacing)

comma =
  $(spacing ',' spacing)

opt_comma =
  $(comma / spacing)

spacing =
  $((spaces / comment)*)

comment =
  $('#' (![\n] .)* [\n]?)

spaces =
  $([ \t\n]+)

eof =
  $(!.)
