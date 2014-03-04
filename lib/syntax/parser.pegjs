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
  builtin_type

// TYPES (higher priority)

builtin_type =
  '.' name:builtin_type_name { return Qjs.builtin(name); }

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
