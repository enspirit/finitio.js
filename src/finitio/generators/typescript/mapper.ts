import type Builder from '@enspirit/ts-gen-dsl';
import type {
  AdTypeAst, AttributeAst, BuiltinTypeAst, ConstraintAst, HeadingAst, SeqTypeAst,
  SetTypeAst, StructTypeAst, SubTypeAst, TupleTypeAst, TypeAst, TypeDefAst,
  TypeRefTypeAst, UnionTypeAst, TypeInstantiationAst, RelationTypeAst
} from '../../parser';
import { Type } from '../../parser';

// The namespace holding the *input* counterpart of every generated type.
export const InputNamespaceName = 'FinitioInputs';

// The interface holding the JavaScript types a schema refers to but that the
// generator cannot name by itself (ADTs over user classes, mostly). It is
// emitted as `unknown` members, that consumers refine through declaration
// merging.
export const JsTypesInterfaceName = 'FinitioJsTypes';

// The helper making constrained sub types nominal, under `brands`.
export const BrandTypeName = 'FinitioBrand';

// The namespace holding the types of every imported system. Keeping them off
// the top level is what lets a schema name a type after one of its imports.
export const ImportsNamespaceName = 'FinitioImports';

// The namespace finitio's own types are imported under. `Type`, `System`,
// `World` and `SystemAst` are all names a schema may well define -- `System`
// especially -- and the entry system's types share their scope.
export const RuntimeNamespaceName = 'FinitioTypes';

// Metadata keys through which a schema names its TypeScript type itself, for
// everything the generator cannot infer:
//
//   /- description: "A UUID", ts: "`${string}-${string}`" -/
//   Uuid = String :: /^[0-9a-f-]+$/
//
// `ts` applies to both sides, `tsInput` overrides it on the input side.
export const TsMetadataKey = 'ts';
export const TsInputMetadataKey = 'tsInput';

// JavaScript types that have a TypeScript primitive counterpart.
const JsPrimitives: Record<string, string> = {
  String: 'string',
  Boolean: 'boolean',
  Number: 'number',
};

// JavaScript types that are globals, and must be spelled `globalThis.X` since
// a schema may well define a type of the same name in the enclosing scope.
const JsGlobals = new Set([
  'Array', 'Date', 'Error', 'Function', 'Map', 'Object', 'Promise', 'RegExp', 'Set',
]);

export type GeneratorOptions = {
  // Emit constrained sub types as nominal types. Off by default: brands are
  // viral, and are only worth their cost when a schema's sub types carry
  // meaning that must not be confused with their super type.
  brands: boolean
  // What Finitio's `Any` maps to. `unknown` is the honest answer, `any` the
  // compatible one.
  anyAs: 'any' | 'unknown'
}

export const DefaultOptions: GeneratorOptions = {
  brands: false,
  anyAs: 'any',
};

// Which of the two types a schema type maps to: what `dress` returns, or what
// it accepts as input.
export type EmitMode = 'dressed' | 'input'

// Resolves a Finitio type name to the TypeScript name it is emitted under, or
// undefined when the name is unknown to the system being generated.
export type NameResolver = (name: string, mode: EmitMode) => string|undefined

export type Ctx = {
  builder: Builder
  mode: EmitMode
  options: GeneratorOptions
  // Type parameters in scope. They are never renamed nor namespaced.
  generics: ReadonlySet<string>
  resolveName: NameResolver
  // Collects the JS types that end up in `FinitioJsTypes`.
  jsTypes: Set<string>
}

export const createCtx = (builder: Builder, overrides: Partial<Ctx> = {}): Ctx => ({
  builder,
  mode: 'dressed',
  options: DefaultOptions,
  generics: new Set(),
  resolveName: () => undefined,
  jsTypes: new Set(),
  ...overrides,
});

// Joins namespace parts, skipping the empty ones.
export const joinNames = (...parts: Array<string|undefined>) =>
  parts.filter((p): p is string => !!p && p.length > 0).join('.');

// `People.Adult` -> `People._Adult`
export const typeNameInput = (n: string) => {
  const parts = n.split('.');
  parts[parts.length - 1] = `_${parts[parts.length - 1]}`;
  return parts.join('.');
};

// Runs `cb` on the builder that owns `fqName`, creating the namespace when the
// name is dotted. Namespaces are always declared in their dotted form
// (`namespace A.B {}`) on the top-level builder: `Builder#flush` does not
// recurse into nested builders' own namespaces.
export const withNamespace = (
  builder: Builder,
  fqName: string,
  cb: (b: Builder, name: string) => void
) => {
  const parts = fqName.split('.');
  const name = parts.pop() as string;

  if (parts.length === 0) {
    cb(builder, name);
  } else {
    builder.withinNamespace(parts.join('.'), (b) => cb(b, name));
  }
};

export type Metadata = Record<string, unknown>

// The metadata a type AST carries, if any. Every type but references and
// instantiations may carry some.
export const metadataOf = (type: TypeAst): Metadata|undefined => {
  const inner = (type as Record<string, { metadata?: Metadata }>)[Object.keys(type)[0]];
  return inner && inner.metadata;
};

// The description a metadata block carries, if any, made safe to sit inside a
// comment.
export const description = (metadata?: Metadata): string|undefined => {
  const text = metadata && metadata.description;
  if (typeof text !== 'string') { return undefined; }

  const safe = text.replace(/\*\//g, '*\\/').trim();
  return safe.length > 0 ? safe : undefined;
};

// Renders a description as a TSDoc comment.
export const buildDoc = (builder: Builder, metadata?: Metadata): string|undefined => {
  const text = description(metadata);
  return text ? builder.doc(text) : undefined;
};

// The TypeScript type a schema names itself through metadata, if any.
export const tsOverride = (ctx: Ctx, metadata?: Metadata): string|undefined => {
  if (!metadata) { return undefined; }

  const override = ctx.mode === 'input' && typeof metadata[TsInputMetadataKey] === 'string'
    ? metadata[TsInputMetadataKey]
    : metadata[TsMetadataKey];

  return typeof override === 'string' ? override : undefined;
};

// Maps a JavaScript type name onto a TypeScript one.
export const buildJsType = (ctx: Ctx, jsType: string): string => {
  const primitive = JsPrimitives[jsType];
  if (primitive) { return primitive; }
  if (JsGlobals.has(jsType)) { return `globalThis.${jsType}`; }

  ctx.jsTypes.add(jsType);
  return `${JsTypesInterfaceName}['${jsType}']`;
};

// Maps a Finitio type reference onto the TypeScript name it is emitted under.
// Type parameters in scope win over everything else, and are left untouched.
export const buildRef = (ctx: Ctx, name: string): string => {
  if (ctx.generics.has(name)) { return name; }
  return ctx.resolveName(name, ctx.mode) || name;
};

//
// A set constraint is the one constraint that maps exactly onto a TypeScript
// type: `String :: {"red", "blue"}` is `'red' | 'blue'`.
//
// The set literal accepts any literal, ranges and regexps included; only a set
// of scalars yields a union.
//
export const buildLiteralUnion = (ctx: Ctx, constraints: Array<ConstraintAst>): string|undefined => {
  const constraint = constraints.find(c => 'set' in c) as { set: Array<unknown> }|undefined;
  const values = constraint && constraint.set;

  if (!values || values.length === 0) { return undefined; }
  if (!values.every(v => ['string', 'number', 'boolean'].includes(typeof v))) {
    return undefined;
  }

  return ctx.builder.union(
    ...values.map(v => ctx.builder.scalar(v as boolean|string|number))
  );
};

//
// `Array` is emitted by the generator itself, so it has to survive a schema
// that defines a type of that name, or takes one as a parameter -- in which
// case the bare identifier no longer means the global.
//
const arrayName = (ctx: Ctx): string =>
  ctx.generics.has('Array') || ctx.resolveName('Array', ctx.mode)
    ? 'globalThis.Array'
    : 'Array';

const unique = (values: Array<string>) => [...new Set(values)];

const buildAttribute = (ctx: Ctx, a: AttributeAst) => ({
  name: a.name,
  def: buildType(ctx, a.type),
  optional: a.required === false,
  doc: description(a.metadata),
});

//
// Builds the object type of a heading, including what `...` allows.
//
// A typed `...: T` guarantees the extra attributes' type, and they survive
// dressing. A bare `...` (or an explicit `...: .`) guarantees nothing, so they
// are dropped when dressing -- but they are still accepted as input.
//
const buildHeading = (ctx: Ctx, heading: HeadingAst) => {
  const attributes = heading.attributes.map(a => buildAttribute(ctx, a));
  const allowExtra = heading.options && heading.options.allowExtra;

  if (!allowExtra) { return ctx.builder.object(attributes); }

  // A bare `...` guarantees nothing, so its extras are dropped when dressing.
  const untyped = Object.keys(allowExtra)[0] === Type.Any;
  if (untyped && ctx.mode === 'dressed') { return ctx.builder.object(attributes); }

  //
  // The index signature has to admit the declared attributes as well as the
  // extras. Intersecting a separate `{ [k: string]: T }` reads well but makes
  // the type uninhabitable the moment an attribute is not assignable to `T`:
  // `{ name: String, ...: Integer }` accepted `{name: 'a', age: 42}` at
  // runtime while rejecting it in TypeScript.
  //
  // A bare `...` states that extras are accepted, not that they are Finitio's
  // `Any`, so this does not follow `anyAs`: nothing is known about them, which
  // is what `unknown` means.
  const extra = untyped ? 'unknown' : buildType(ctx, allowExtra);

  // `any` and `unknown` absorb every other member of the union.
  const members = extra === 'any' || extra === 'unknown'
    ? [extra]
    : unique([
      extra,
      ...attributes.map(a => a.def),
      ...(attributes.some(a => a.optional) ? ['undefined'] : []),
    ]);

  return ctx.builder.object([
    ...attributes,
    { name: '[k: string]', def: ctx.builder.union(...members) },
  ]);
};

//
// Maps a type AST onto a TypeScript type, in the mode carried by `ctx`.
//
// The mode is carried rather than passed per-call, so that every recursion
// stays on the same side of the dress/undress divide.
//
export const buildType = (ctx: Ctx, type: TypeAst): string => {
  const typeType = Object.keys(type)[0] as Type;

  const override = tsOverride(ctx, metadataOf(type));
  if (override) { return override; }

  switch (typeType) {
  case Type.Any:
    return ctx.options.anyAs;

  case Type.Builtin:
    return buildJsType(ctx, (type as BuiltinTypeAst).builtin.jsType);

  case Type.TypeRef:
    return buildRef(ctx, (type as TypeRefTypeAst).ref.typeName);

  case Type.Seq:
    return ctx.builder.withGenerics(
      [buildType(ctx, (type as SeqTypeAst).seq.elmType)],
      arrayName(ctx)
    );

  case Type.Set:
    // A finitio set dresses to -- and is fed from -- a JavaScript Array whose
    // elements happen to be unique, not a JavaScript Set.
    return ctx.builder.withGenerics(
      [buildType(ctx, (type as SetTypeAst).set.elmType)],
      arrayName(ctx)
    );

  case Type.Tuple:
    return buildHeading(ctx, (type as TupleTypeAst).tuple.heading);

  case Type.Relation:
    return ctx.builder.withGenerics(
      [buildHeading(ctx, (type as RelationTypeAst).relation.heading)],
      arrayName(ctx)
    );

  case Type.Struct:
    return ctx.builder.tuple(
      ...(type as StructTypeAst).struct.componentTypes.map(t => buildType(ctx, t))
    );

  case Type.Sub: {
    const sub = (type as SubTypeAst).sub;
    // Most constraints are not expressible in TypeScript, and a sub type is
    // then its super type. A set constraint is the exception.
    return buildLiteralUnion(ctx, sub.constraints) || buildType(ctx, sub.superType);
  }

  case Type.Union:
    return ctx.builder.union(
      ...(type as UnionTypeAst).union.candidates.map(c => buildType(ctx, c))
    );

  case Type.Ad: {
    const adt = (type as AdTypeAst).adt;

    //
    // Without a `.JsType` preamble the parser makes every contract an
    // identity, and there is no JS type on either side: the value simply is
    // whatever its information type is. `buildJsType(undefined)` used to emit
    // `FinitioJsTypes['undefined']`, and an interface member with no name at
    // all, which no TypeScript parser accepts.
    //
    if (!adt.jsType) {
      return ctx.builder.union(
        ...unique(adt.contracts.map(c => buildType(ctx, c.infoType)))
      );
    }

    // Otherwise it dresses to that JS type, and accepts either it or any of
    // the information types its contracts are defined over.
    const dressed = buildJsType(ctx, adt.jsType);
    if (ctx.mode === 'dressed') { return dressed; }

    return ctx.builder.union(
      dressed,
      ...adt.contracts.map(c => buildType(ctx, c.infoType))
    );
  }

  case Type.TypeInstantiation: {
    const ti = (type as TypeInstantiationAst).instantiate;
    return ctx.builder.withGenerics(
      ti.instantiation.map(n => buildRef(ctx, n)),
      buildRef(ctx, ti.typeName)
    );
  }
  }
};

export type Scope = {
  // '' for the entry system, `FinitioSystem<n>` for the imported ones.
  nsPrefix: string
  resolveName: NameResolver
  jsTypes: Set<string>
  options: GeneratorOptions
  // Collects the type definitions that got branded.
  brands: Set<string>
}

export const emptyScope = (overrides: Partial<Scope> = {}): Scope => ({
  nsPrefix: '',
  resolveName: () => undefined,
  jsTypes: new Set(),
  options: DefaultOptions,
  brands: new Set(),
  ...overrides,
});

//
// Whether a definition is worth branding: it must constrain its super type,
// and not already have been narrowed to a literal union, which is precise
// enough on its own.
//
// A brand is an intersection, which is only meaningful over a type that can
// carry a property. Two cases cannot, and are declined here:
//
//   - a definition whose TypeScript type the schema stated itself, through
//     `ts:`. That is the author saying exactly what they want, and a brand is
//     not it. The stdlib's `Nil` is `ts: "null"`, and `null & {...}` is `never`
//     -- which would not merely lose the brand but drop the type out of every
//     union it sits in;
//   - a sub type of `Any`, which widens to `any` or `unknown`, where the
//     intersection collapses the other way and lets any object through.
//
// A reference cannot be followed from here -- the resolver hands back names,
// not ASTs -- so `X = Nil( ... )` is still branded. `FinitioBrand` is
// conditional for that reason, and passes a type that cannot carry a brand
// through untouched.
//
const brandable = (ctx: Ctx, typeDef: TypeDefAst): boolean => {
  if (Object.keys(typeDef.type)[0] !== Type.Sub) { return false; }
  if (tsOverride(ctx, typeDef.metadata)) { return false; }

  const sub = (typeDef.type as SubTypeAst).sub;
  if (sub.constraints.length === 0 || sub.constraints.some(c => 'set' in c)) { return false; }

  return brandableType(ctx, sub.superType);
};

//
// Whether a brand can sit on the TypeScript type this AST maps to. Anything
// but `Any` and an overridden type carries one fine.
//
const brandableType = (ctx: Ctx, type: TypeAst): boolean => {
  if (tsOverride(ctx, metadataOf(type))) { return false; }

  const typeType = Object.keys(type)[0] as Type;

  if (typeType === Type.Any) { return false; }

  // A chain of sub types is no more brandable than its foot.
  if (typeType === Type.Sub) {
    return brandableType(ctx, (type as SubTypeAst).sub.superType);
  }

  return true;
};

// Emits the dressed type of one type definition.
export const buildTypeDef = (builder: Builder, typeDef: TypeDefAst, scope: Scope = emptyScope()) => {
  withNamespace(builder, joinNames(scope.nsPrefix, typeDef.name), (b, name) => {
    // Build on the namespace's own builder, so that nested definitions are
    // indented according to their depth.
    const ctx = createCtx(b, {
      mode: 'dressed',
      options: scope.options,
      generics: new Set(typeDef.generics),
      resolveName: scope.resolveName,
      jsTypes: scope.jsTypes,
    });

    let def = tsOverride(ctx, typeDef.metadata) || buildType(ctx, typeDef.type);

    if (scope.options.brands && brandable(ctx, typeDef)) {
      // Qualified by the namespace the definition is emitted under: two systems
      // of a bundle may well both define a `Positive`, and an unqualified brand
      // would make them the same nominal type -- which is the confusion brands
      // exist to deny.
      const brand = joinNames(scope.nsPrefix, typeDef.name);
      scope.brands.add(brand);
      def = b.withGenerics([def, b.scalar(brand)], BrandTypeName);
    }

    const decl = typeDef.generics ? b.withGenerics(typeDef.generics, name) : name;
    const doc = buildDoc(b, typeDef.metadata);

    b.addToken(...(doc ? [doc] : []), b.typeDef(decl, def));
  });
};

// Emits the input type of one type definition, under the inputs namespace.
//
// Inputs are never branded: they come from the outside, unvalidated, which is
// exactly what a brand is meant to deny.
export const buildTypeDefInput = (builder: Builder, typeDef: TypeDefAst, scope: Scope = emptyScope()) => {
  const fqName = joinNames(scope.nsPrefix, InputNamespaceName, typeNameInput(typeDef.name));

  withNamespace(builder, fqName, (b, name) => {
    const ctx = createCtx(b, {
      mode: 'input',
      options: scope.options,
      generics: new Set(typeDef.generics),
      resolveName: scope.resolveName,
      jsTypes: scope.jsTypes,
    });

    const def = tsOverride(ctx, typeDef.metadata) || buildType(ctx, typeDef.type);
    const decl = typeDef.generics ? b.withGenerics(typeDef.generics, name) : name;
    const doc = buildDoc(b, typeDef.metadata);

    b.addToken(...(doc ? [doc] : []), b.typeDef(decl, def));
  });
};

// A Finitio type name is a valid TypeScript key only when it is a plain
// identifier; namespaced ones (`People.Adult`) must be quoted, so that the
// collection keys match the names the system is indexed by at runtime.
const collectionKey = (name: string) =>
  /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `'${name}'`;

// Emits the `Type<Input, Dressed>` collection of a whole system, which is what
// `System<T>` is parameterized with.
export const buildTypeCollection = (
  builder: Builder,
  types: Array<TypeDefAst>,
  systemName: string = 'SystemTypes',
  scope: Scope = emptyScope()
) => {
  const name = (t: TypeDefAst, mode: EmitMode) => {
    const resolved = scope.resolveName(t.name, mode);
    const base = resolved || (mode === 'dressed'
      ? t.name
      : joinNames(InputNamespaceName, typeNameInput(t.name)));

    // Generics cannot be left free in the collection: instantiate with unknown.
    return t.generics
      ? builder.withGenerics(t.generics.map(() => 'unknown'), base)
      : base;
  };

  withNamespace(builder, joinNames(scope.nsPrefix, systemName), (b, declared) => {
    b.addToken(b.typeDef(declared, b.object(types.map(t => ({
      name: collectionKey(t.name),
      def: `${RuntimeNamespaceName}.Type<${name(t, 'input')}, ${name(t, 'dressed')}>`,
    })))));
  });
};

//
// The namespace an imported system's types are emitted under, derived from
// its source url so that it depends on *which* systems are imported and not
// on the order they are reached in. A generated declaration file gets
// committed and reviewed; renumbering it on every new import would bury the
// change that matters.
//
export const systemSlug = (url: string): string => {
  const segments = url.split('/').filter(s => s.length > 0);
  const base = segments[segments.length - 1] || url;
  const words = base.replace(/\.[a-z0-9]+$/i, '').split(/[^A-Za-z0-9]+/).filter(Boolean);
  const slug = words.map(w => w[0].toUpperCase() + w.slice(1)).join('');

  return /^[A-Za-z]/.test(slug) ? slug : `S${slug}`;
};

// djb2, kept short. Only ever appended to disambiguate two systems whose urls
// end on the same name, so that adding a third never renumbers the first two.
export const urlDigest = (url: string): string => {
  let h = 5381;
  for (let i = 0; i < url.length; i++) {
    h = ((h * 33) ^ url.charCodeAt(i)) >>> 0;
  }
  return h.toString(16).padStart(8, '0').slice(0, 4);
};

//
// Assigns each url the namespace its types are emitted under. `entry` is
// emitted at the top level, so that consumers import its types directly.
//
export const systemNamespaces = (urls: Array<string>): Map<string, string> => {
  const imported = urls.slice(1);
  const counts = new Map<string, number>();

  imported.forEach((url) => {
    const slug = systemSlug(url);
    counts.set(slug, (counts.get(slug) || 0) + 1);
  });

  const namespaces = new Map<string, string>();
  if (urls.length > 0) { namespaces.set(urls[0], ''); }

  imported.forEach((url) => {
    const slug = systemSlug(url);
    const unique = (counts.get(slug) || 0) > 1 ? `${slug}_${urlDigest(url)}` : slug;
    namespaces.set(url, joinNames(ImportsNamespaceName, unique));
  });

  return namespaces;
};

// Emits the interface standing for the JS types a schema refers to but that
// the generator cannot name. Returns '' when the schema refers to none.
export const buildJsTypesInterface = (builder: Builder, jsTypes: Set<string>): string => {
  if (jsTypes.size === 0) { return ''; }

  return [
    builder.doc([
      'JavaScript types this schema refers to, that finitio cannot name on its',
      'own. Refine them through declaration merging on this interface.',
    ].join('\n')),
    builder.interface(JsTypesInterfaceName, [...jsTypes].sort().map(n => ({
      name: collectionKey(n),
      def: 'unknown',
    }))),
  ].join('\n');
};

//
// Emits the brand helper, when at least one definition got branded.
//
// Brands are carried in a single property whose keys accumulate, so that they
// compose: a sub type of a branded type keeps both brands, and stays
// assignable to its super type while the converse does not hold.
//
// The helper is conditional so that a type which cannot carry a property comes
// back untouched rather than as `never`. `null & { ... }` is `never`, and a
// `never` arm vanishes from the union it sits in -- so branding a nullable
// would quietly drop its null. Being a conditional over a naked `T`, it
// distributes, and brands the arms that can be branded on their own.
//
export const buildBrandHelper = (brands: Set<string>): string => {
  if (brands.size === 0) { return ''; }

  return [
    '// Makes constrained sub types nominal: values of these types can only be',
    '// obtained by dressing, not written by hand.',
    `export type ${BrandTypeName}<T, N extends string> =`,
    // `unknown extends T` holds for `unknown` and `any` alone. Intersecting
    // either collapses to an object type, which stops accepting primitives --
    // and the mapper cannot always see it coming, since a reference resolves
    // to a name rather than to an AST.
    '  unknown extends T ? T',
    '  : T extends null|undefined ? T',
    '  : T & { readonly __finitio: { [K in N]: true } };',
  ].join('\n');
};
