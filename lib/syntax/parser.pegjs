{
  Qjs    = require('../qjs');
  System = require('../system');
  Stack  = {}
  function headTailToArray(head, tail) {
    result = [ head ];
    for (var i = 0; i < tail.length; i++) {
      result[i+1] = tail[i][tail[i].length-1];
    }
    return result;
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
    rel_type constraint_def
  / rel_type

constraint_def =
  '(' spacing var_name spacing '|' spacing constraints spacing ')'

constraints =
    named_constraint (spacing ',' spacing named_constraint)*
  / unnamed_constraint

named_constraint =
  constraint_name ':' spacing expression

unnamed_constraint =
  spacing expression

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
  $((!'[(,)]' .)+)

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
