{
  $u = require('./support/utils');
  compiler = options.compiler;

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
      cs[i] = compiler.constraint(name, fn);
    }
    return cs;
  }

  // compile a [ [ ... ], ... ] to contracts
  function compileContracts(cs, jsType) {
    var contracts = [];
    for (var i = 0; i<cs.length; i++) {
      if (cs[i].length < 3 && jsType){
        cs[i].push(jsType);
      }
      contracts.push(compiler.contract.apply(compiler, cs[i]));
    }
    return contracts;
  }
}

// SYSTEM

system =
  definitions spacing m:type? spacing eof {
    if (m){
      compiler.setMain(m);
    }
    return compiler.system;
  }

definitions =
  (spacing type_def)*

type_def =
  n:type_name spacing '=' spacing t:type {
    return compiler.addType(compiler.alias(t, n));
  }

// TYPES (low priority)

type =
  union_type

union_type =
    head:sub_type tail:(pipe sub_type)+ {
      return compiler.union(headTailToArray(head, tail));
    }
  / sub_type

sub_type =
    t:rel_type c:constraint_fn {
      return compiler.sub_type(t, c)
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
    return compiler.tuple(h)
  }

relation_type =
  '{{' spacing h:heading spacing '}}' {
    return compiler.relation(h)
  }

heading =
    head:attribute? tail:(opt_comma attribute)* opt_comma d:dots? {
      var opts  = { allowExtra: (d ? true : false) };
      return compiler.heading(headTailToArray(head, tail), opts);
    }
  / spacing

attribute =
  n:attribute_name spacing ':' optional:'?'? spacing t:type {
    var required = (optional !== '?')
    return compiler.attribute(n, t, required)
  }

// TYPES (collections)

collection_type =
    set_type
  / seq_type
  / struct_type
  / term_type

set_type =
  '{' spacing t:type spacing '}' {
    return compiler.set(t)
  }

struct_type =
  '<' head:type tail:(opt_comma type)* opt_comma '>' {
    return compiler.struct(headTailToArray(head, tail));
  }

seq_type =
  '[' spacing t:type spacing ']' {
    return compiler.seq(t)
  }

// TYPES (higher priority)

term_type =
    ad_type
  / builtin_type
  / any_type
  / type_ref

ad_type =
  t:('.' builtin_type_name)? spacing cs:contracts {
    var jsType = (t) ? compiler.jsType(t[1]) : null;
    var contracts = compileContracts(cs, jsType);
    return compiler.adt(jsType, contracts);
  }

contracts =
  head:contract tail:(opt_comma contract)* opt_comma {
    return headTailToArray(head, tail);
  }

contract =
  '<' n:contract_name '>' spacing t:type spacing '\\' up:lambda_expr spacing '\\' down:lambda_expr {
    return [ n, t, up, down ];
  }
/ '<' n:contract_name '>' spacing t:type spacing '.' b:builtin_type_name {
    return [ n, t, compiler.jsType(b) ];
  }
/ '<' n:contract_name '>' spacing t:type {
    return [ n, t ];
  }

lambda_expr =
  '(' spacing n:var_name spacing '|' spacing e:expression spacing ')' {
    return compileLambda(n, e);
  }

any_type =
  '.' {
    return compiler.any();
  }

builtin_type =
  '.' name:builtin_type_name {
    return compiler.builtin(name);
  }

type_ref =
   n:type_name {
    return compiler.typeRef(n);
  }

// EXPRESSIONS

expression =
  $((paren_expression / any_expression)+)

paren_expression =
  $('()' / '(' expression ')')

any_expression =
  $((![(,)] .)+)

// LITERALS

literal =
    string_literal
  / real_literal
  / integer_literal
  / boolean_literal

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
