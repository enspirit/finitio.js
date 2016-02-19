{
  // Converts head:X tail(... X)* to an array of Xs
  function headTailToArray(head, tail) {
    var result = (head ? [ head ] : []);
    for (var i = 0; i < tail.length; i++) {
      result[i+1] = tail[i][tail[i].length-1];
    }
    return result;
  }

  // Sets metadata on arg if defined
  function metadatize(arg, metadata) {
    if (metadata){
      arg.metadata = metadata;
    }
    return arg;
  }
}

// SYSTEM

system =
  spacing is:imports spacing ds:definitions spacing meta:metadata? spacing main:type? spacing eof {
    var system = {
      types: ds
    };
    if (is && is.length>0) {
      system.imports = is;
    }
    if (main){
      main = { name: 'Main', type: main };
      if (meta){
        main.metadata = meta;
      }
      system.types.push(main);
    }
    return system;
  }

imports =
  head:import_def? tail:(spacing import_def)* {
    return headTailToArray(head, tail);
  }

import_def =
  '@import' spaces s:system_from spaces 'as' spaces q:type_qualifier {
    return { qualifier: q, from: s }
  }
/ '@import' spaces s:system_from
 {
    return { from: s }
  }

definitions =
  head:type_def? tail:(spacing type_def)* {
    return headTailToArray(head, tail);
  }

type_def =
  m:metadata? n:type_name spacing '=' spacing t:type {
    return metadatize({ name: n, type: t }, m);
  }

// TYPES (low priority)

type =
  union_type

union_type =
  m:metadata? head:sub_type tail:(pipe sub_type)+ {
    var cs = headTailToArray(head, tail);
    return { union: metadatize({ candidates: cs }) };
  }
/ sub_type

sub_type =
  m:metadata? t:rel_type cs:constraint {
    return { sub: metadatize({ superType: t, constraints: cs }, m) };
  }
/ rel_type

constraint =
  '(' spacing n:var_name pipe cs:constraints spacing ')' {
    for (var i=0; i<cs.length; i++){
      cs[i].native = [n, cs[i].native];
    }
    return cs;
  }

constraints =
  head:named_constraint tail:(opt_comma named_constraint)* opt_comma {
    return headTailToArray(head, tail);
  }
/ c:unnamed_constraint {
    return [c];
  }

named_constraint =
  m:metadata? n:constraint_name ':' spacing e:expression {
    return metadatize({ name: n, native: e.trim() }, m);
  }

unnamed_constraint =
  e:expression {
    return { native: e.trim() };
  }

// TYPES (relational)

rel_type =
  relation_type
/ tuple_type
/ collection_type

tuple_type =
  m:metadata? '{' spacing h:heading spacing '}' {
    return { tuple: metadatize({ heading: h }, m) };
  }

relation_type =
  m:metadata? '{{' spacing h:heading spacing '}}' {
    return { relation: metadatize({ heading: h }, m) };
  }

heading =
  head:attribute? tail:(opt_comma attribute)* opt_comma d:dots ':' spacing t:type {
    var attributes = headTailToArray(head, tail);
    var info = { attributes: attributes };
    info.options = { allowExtra: t };
    return info;
  }
/  head:attribute? tail:(opt_comma attribute)* opt_comma d:dots? {
    var attributes = headTailToArray(head, tail);
    var info = { attributes: attributes };
    if (d){
      info.options = { allowExtra: { any: {} } };
    }
    return info;
  }

attribute =
  m:metadata? n:attribute_name spacing ':' optional:'?'? spacing t:type {
    var info = { name: n, type: t };
    if (optional){
      info.required = false;
    }
    return metadatize(info, m);
  }

// TYPES (collections)

collection_type =
  set_type
/ seq_type
/ struct_type
/ term_type

set_type =
  m:metadata? '{' spacing t:type spacing '}' {
    return { set: metadatize({ elmType: t }, m) };
  }

seq_type =
  m:metadata? '[' spacing t:type spacing ']' {
    return { seq: metadatize({ elmType: t }, m) };
  }

struct_type =
  m:metadata? '<' head:type tail:(opt_comma type)* opt_comma '>' {
    var ts = headTailToArray(head, tail);
    return { struct: metadatize({ componentTypes: ts }, m) };
  }

// TYPES (higher priority)

term_type =
  ad_type
/ builtin_type
/ any_type
/ type_ref

ad_type =
  p:ad_type_preamble? spacing cs:contracts {
    if (!p){ p = {}; }
    var contracts = [], contract;
    for (var i=0; i<cs.length; i++){
      contract = cs[i];
      if (!contract.external && !contract.explicit){
        if (p.jsType){
          contract.internal = p.jsType;
        } else {
          contract.identity = {};
        }
      }
      contracts[i] = contract;
    }
    p.contracts = contracts;
    return { adt: p };
  }

ad_type_preamble =
  m:metadata? t:('.' builtin_type_name) {
    var r = {};
    if (t){
      r.jsType = t[1];
    }
    return metadatize(r, m);
  }

contracts =
  head:contract tail:(opt_comma contract)* opt_comma {
    return headTailToArray(head, tail);
  }

contract =
  b:contract_base spacing '\\' up:lambda_expr spacing '\\' down:lambda_expr {
    b.explicit = { dress: up, undress: down };
    return b;
  }
/ b:contract_base spacing '.' t:builtin_type_name {
    b.external = t;
    return b;
  }
/ contract_base

contract_base =
  m:metadata? '<' n:contract_name '>' spacing t:type {
    return metadatize({ name: n, infoType: t }, m);
  }

any_type =
  m:metadata? '.' {
    return { any: metadatize({}, m) };
  }

builtin_type =
  m:metadata? '.' name:builtin_type_name {
    return { builtin: metadatize({ jsType: name }, m) };
  }

type_ref =
  p:type_path {
    return { ref: { typeName: p } };
  }

// EXPRESSIONS

lambda_expr =
  '(' spacing n:var_name spacing '|' spacing e:expression spacing ')' {
    return [ n.trim(), e.trim() ];
  }

expression =
  $((paren_expression / any_expression)+)

paren_expression =
  $('()' / '(' expression ')')

any_expression =
  $((![(,)] .)+)

// METADATA

metadata =
  '/-' spacing head:metaattr tail:(opt_comma metaattr)* spacing '-/' spacing {
    var attrs = headTailToArray(head, tail);
    var metadata = {};
    for (var i=0; i<attrs.length; i++){
      metadata[attrs[i][0]] = attrs[i][1];
    }
    return metadata;
  }
/ '/-' t:$(!'-/' .)+ '-/' spacing {
    return{ description: t.toString().trim() };
  }

metaattr =
  n:attribute_name spaces? ':' spaces? v:literal {
    return [ n, v ];
  }

// LITERALS

literal =
  string_literal
/ real_literal
/ integer_literal
/ boolean_literal
/ array_literal

string_literal =
  s:$(["] ([\\]["] / !["] .)* ["]) {
    return s.substring(1, s.length-1).replace(/\\"/, '"');
  }

integer_literal =
  s:$([1-9][0-9]* / [0] / [-] integer_literal) {
    return parseInt(s);
  }

real_literal =
  s:$(integer_literal? '.' [0-9]+) {
    return parseFloat(s);
  }

boolean_literal =
  "true"  { return true;  }
/ "false" { return false; }

array_literal =
  '[' spacing head:literal tail:(opt_comma literal)* spacing ']' {
    return headTailToArray(head, tail);
  }
/ '[' spacing ']' {
    return [];
  }

// LEXER (names)

var_name =
  $([a-z]+)

contract_name =
  $([a-z] [a-z0-9]*)

constraint_name =
  $([a-z] [a-zA-Z_]*)

attribute_name =
  $([a-z$_] [a-zA-Z0-9_]*)

type_name =
  $((type_qualifier '.')? [A-Z] [a-zA-Z:]*)

type_qualifier =
  $([a-z][a-z0-9]*)

type_path =
  $(type_name ('/' [a-zA-Z0-9_]+)*)

builtin_type_name =
  $([a-zA-Z0-9:.]+)

system_from =
  $((![ \n\t] .)+)

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
