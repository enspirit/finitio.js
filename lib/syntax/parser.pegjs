{
  Qjs = require('../qjs');
}

// SYSTEM

system =
  definitions spacing type? spacing eof

definitions =
  (spacing type_def)*

type_def =
  type_name spacing '=' spacing type

// TYPES (low priority)

type =
  union_type

union_type =
    head:sub_type tail:('|' sub_type)+ {
      candidates = [ head ]
      for (var i = 0; i < tail.length; i++) {
        candidates[i+1] = tail[i][1];
      }
      return Qjs.union(candidates);
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
  '{' spacing heading spacing '}'

relation_type =
  '{{' spacing heading spacing '}}'

heading =
    attribute (spacing ',' spacing attribute)*
  / spacing

attribute =
  attribute_name spacing ':' type

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

builtin_type =
  '.' name:builtin_type_name {
    return Qjs.builtin(name);
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
