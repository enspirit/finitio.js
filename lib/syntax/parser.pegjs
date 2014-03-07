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
    var result = [ head ];
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
    t.name = n;
    options.system.addType(t);
    return t;
  }

// TYPES (low priority)

type =
  union_type

union_type =
    head:sub_type tail:('|' sub_type)+ {
      return Factory.union(headTailToArray(head, tail));
    }
  / sub_type

sub_type =
    t:rel_type c:constraint_fn {
      return Factory.sub_type(t, c)
    }
  / rel_type

constraint_fn =
  '(' spacing n:var_name spacing '|' spacing c:constraints spacing ')' {
    return compileConstraints(n, c)
  }

constraints =
    head:named_constraint tail:(spacing ',' spacing named_constraint)* {
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
    head:attribute tail:(spacing ',' spacing attribute)* {
      return Factory.heading(headTailToArray(head, tail));
    }
  / spacing

attribute =
  n:attribute_name spacing ':' spacing t:type {
    return Factory.attribute(n, t)
  }

// TYPES (collections)

collection_type =
    set_type
  / seq_type
  / term_type

set_type =
  '{' spacing t:type spacing '}' {
    return Factory.set(t)
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
    var jsType = null;
    var contracts = {}
    if (t) {
      jsType = Factory.jsType(t[1]);
    }
    for (var i = 0; i<cs.length; i++) {
      contracts[cs[i][0]] = cs[i].slice(1);
    }
    return Factory.adt(jsType, contracts);
  }

contracts =
  head:contract tail:(spacing ',' spacing contract)* {
    return headTailToArray(head, tail);
  }

contract =
  '<' n:contract_name '>' spacing t:type spacing d:dressers? {
    var result = [ n, t ];
    if (d) {
      result.push(d[0]);
      result.push(d[1]);
    } else {
      var unimplemented = function(value){
        throw "Automated contracts are not implemented so far";
      };
      result.push(unimplemented);
      result.push(unimplemented);
    }
    return result;
  }

dressers =
    '\\' up:lambda_expr spacing '\\' down:lambda_expr {
      return [ up, down ];
    }
  / '.' t:builtin_type_name {
    pair = Factory.jsType(t);
    if (pair.dress instanceof Function && pair.undress instanceof Function) {
      return [ pair.dress, pair.undress ];
    } else {
      error("Invalid information contractor `" + t + "`");
    }
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
  $([A-Z] [a-zA-Z]+)

builtin_type_name =
  $([a-zA-Z0-9:.]+)

// LEXER (spacing and comments)

spacing =
  $((spaces / comment)*)

comment =
  $('#' (![\n] .)* [\n]?)

spaces =
  $([ \t\n]+)

eof =
  $(!.)
