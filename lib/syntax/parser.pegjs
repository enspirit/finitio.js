{
  Qjs        = require('../qjs');
  System     = require('../system');
  Stack      = {}

  // converts head:X tail(... X)* to an array of Xs
  function headTailToArray(head, tail) {
    var result = [ head ];
    for (var i = 0; i < tail.length; i++) {
      result[i+1] = tail[i][tail[i].length-1];
    }
    return result;
  }

  // compile a [ [n1, expr1], ... ] to an array of constraints
  function compileConstraints(varname, defs) {
    var cs = [];
    for (var i = 0; i < defs.length; i++) {
      var name = defs[i][0];
      var expr = defs[i][1];
      var src  = "x = function(" + varname + ")" + "{ return " + expr + "; }";
      var fn   = eval(src);
      cs[i] = Qjs.constraint(name, fn);
    }
    return cs;
  }
}

// SYSTEM

system =
  d:definitions spacing m:type? spacing eof {
    return new System(d, m);
  }

definitions =
  & { Stack.defs = {}; return Stack.defs; }
  (spacing type_def)* {
    return Stack.defs;
  }

type_def =
  n:type_name spacing '=' spacing t:type {
    t.name = n;
    Stack.defs[n] = t;
    return t;
  }

// TYPES (low priority)

type =
  union_type

union_type =
    head:sub_type tail:('|' sub_type)+ {
      return Qjs.union(headTailToArray(head, tail));
    }
  / sub_type

sub_type =
    t:rel_type c:constraint_fn {
      return Qjs.sub_type(t, c)
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
    return Qjs.tuple(h)
  }

relation_type =
  '{{' spacing h:heading spacing '}}' {
    return Qjs.relation(h)
  }

heading =
    head:attribute tail:(spacing ',' spacing attribute)* {
      return Qjs.heading(headTailToArray(head, tail));
    }
  / spacing

attribute =
  n:attribute_name spacing ':' spacing t:type {
    return Qjs.attribute(n, t)
  }

// TYPES (collections)

collection_type =
    set_type
  / seq_type
  / term_type

set_type =
  '{' spacing t:type spacing '}' {
    return Qjs.set(t)
  }

seq_type =
  '[' spacing t:type spacing ']' {
    return Qjs.seq(t)
  }

// TYPES (higher priority)

term_type =
    builtin_type
  / type_ref

builtin_type =
  '.' name:builtin_type_name {
    return Qjs.builtin(name);
  }

type_ref =
   n:type_name {
    var t = Stack.defs[n];
    if (t) {
      return t;
    } else {
      throw new Error("Unknown type " + n);
    }
  }

// EXPRESSIONS

expression =
  $((paren_expression / any_expression)+)

paren_expression =
  $('(' expression ')')

any_expression =
  $((![(,)] .)+)

// LEXER (names)

var_name =
  $([a-z]+)

contract_name =
  $([a-z] [a-z0-9]*)

constraint_name =
  $([a-z] [a-z_]*)

attribute_name =
  $([a-z] [a-zA-Z0-9_]*)

type_name =
  $([A-Z] [a-zA-Z]+)

builtin_type_name =
  $([a-zA-Z0-9:]+)

// LEXER (spacing and comments)

spacing =
  $((spaces / comment)*)

comment =
  $('#' (![\n] .)* [\n]?)

spaces =
  $([ \t\n]+)

eof =
  $(!.)
