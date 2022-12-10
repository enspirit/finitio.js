const Primitives = {
  Number: 'number',
  Boolean: 'boolean',
  String: 'string',
};

const generate = (type, system) => {

  if (!system) {
    throw new Error(`System expected, got ${system}`);
  }
  if (!type || !type.constructor) {
    throw new Error(`Type constructor expected, got ${type}`);
  }

  const toTypescript = (type, override) => generate(type, override || system);

  const BuiltinType = ({ jsType }) => {
    const name = jsType.name;
    return Primitives[name] || name;
  };

  const UnionType = ({ candidates }) => {
    return candidates.map(t => toTypescript(t)).join(' | ');
  };

  const SeqType = ({ elmType }) => {
    return `${toTypescript(elmType)}[]`;
  };

  const SetType = ({ elmType }) => {
    return `Set<${toTypescript(elmType)}>`;
  };

  const StructType = ({ componentTypes }) => {
    const names = componentTypes.map(t => toTypescript(t));
    return `[${names.join(', ')}]`;
  };

  const Attribute = (attr) => {
    const delimiter = attr.required ? ':' : '?:';
    return [
      attr.name,
      delimiter,
      toTypescript(attr.type),
    ].join(' ');
  };

  const Heading = (heading) => {
    const fields = heading.attributes.map(a => toTypescript(a, system)).join(',\n');
    const base = ['{', fields, '}'].join('\n');
    if (!heading.options.allowExtra) {
      return base;
    }
    return `${base} & { [key: string]: ${toTypescript(heading.options.allowExtra)} }`;
  };

  const TupleType = ({ heading }) => {
    return toTypescript(heading);
  };

  const RelationType = ({ heading }) => {
    return `Set<${toTypescript(heading)}>`;
  };

  const SubType = ({ superType }) => {
    return toTypescript(superType);
  };

  const TypeRef = (type) => {
    if (system[type.typeName]) {
      return type.typeName;
    }
    return toTypescript(type.target.type);
  };

  const TypeDef = ({ type, name }) => {
    return `type ${name} = ${toTypescript(type)};`;
  };

  const System = (system) => {
    return system.types.map(t => toTypescript(t, system))
      .join('\n\n');
  };

  const Generators = {
    'AnyType': () => 'any',
    BuiltinType,
    UnionType,
    SeqType,
    SetType,
    StructType,
    Attribute,
    Heading,
    TupleType,
    RelationType,
    SubType,
    // We loose the contracts and go for the builtin type
    AdType: BuiltinType,
    TypeRef,
    TypeDef,
    System,
  };

  const generator = Generators[type.constructor.name];
  if (!generator) {
    throw new Error(`No typescript generator found for type: ${type.constructor.name}`);
  }
  return generator(type, system);
};

export default {
  generate,
};
