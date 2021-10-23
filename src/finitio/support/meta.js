import Attribute from '../support/attribute';
import Heading from '../support/heading';
import Contract from '../support/contract';
import Constraint from '../support/constraint';
import Import from '../support/import';
import Contracts from '../contracts';
import Type from '../type';
import AdType from '../type/ad_type';
import BuiltinType from '../type/builtin_type';
import TupleType from '../type/tuple_type';
import RelationType from '../type/relation_type';
import UnionType from '../type/union_type';
import SeqType from '../type/seq_type';
import SetType from '../type/set_type';
import AnyType from '../type/any_type';
import StructType from '../type/struct_type';
import SubType from '../type/sub_type';
import TypeRef from '../type/type_ref';
import TypeDef from '../type/type_def';
import System from '../system';

const Js = {};
const Meta = { Js: Js };

// -------------------------------------------------------------- Javascript

Js.Object = BuiltinType.info({ jsType: Object });

Js.String = BuiltinType.info({ jsType: String });

Js.Boolean = BuiltinType.info({ jsType: Boolean });

Js.Number = BuiltinType.info({ jsType: Number });

Js.Array = BuiltinType.info({ jsType: Array });

Js.Type = AdType.info({
  jsType: Function,
  contracts: [
    Contract.info({
      name: 'jsTypeName',
      infoType: Js.String,
      explicit: {
        dress: function(name, world) {
          return Contracts.JsType.name.dress(name, world.JsTypes);
        },
        undress: Contracts.JsType.name.undress,
      },
    }),
  ],
});

Js.Empty = SubType.info({
  superType: AnyType.info({}),
  constraints: [
    Constraint.info({
      name: 'default',
      native: function(v) {
        if (v === null || v === undefined) { return false; }
        for (const k in v) { return false; }
        return true;
      },
    }),
  ],
});

// --------------------------------------------------------------- Functions
Js.FunctionDefn = SeqType.info({ elmType: Js.String });
Js.Function = AdType.info({
  jsType: Function,
  contracts: [
    Contract.info({
      name:      'defn',
      infoType:  Js.FunctionDefn,
      external:  Contracts.Expression.defn,
    }),
    Contract.info({
      name:      'reference',
      infoType:  Js.String,
      external:  Contracts.Function.reference,
    }),
  ],
});

// ----------------------------------------------------------------- RegExps

Js.RegExp = AdType.info({
  jsType: RegExp,
  contracts: [
    Contract.info({
      name:      'src',
      infoType:  Js.String,
      explicit: {
        dress:   function(src) { return new RegExp(src); },
        undress: function(rx) { return rx.source; },
      },
    }),
  ],
});

// ------------------------------------------------------------------ Shared

const metadataAttr = Attribute.info({
  name: 'metadata',
  type: Js.Object,
  required: false,
});

// ------------------------------------------------------------------- Tools

const levelUp = function(name, jsType, infoType, contractName) {
  return AdType.info({
    jsType: jsType,
    contracts: [
      Contract.info({
        name:      contractName,
        infoType:  infoType,
        internal:  jsType,
      }),
    ],
  });
};

const object = function(name, jsType, attributes) {
  attributes.push(metadataAttr);
  const infoType = TupleType.info({
    heading: Heading.info({ attributes: attributes }),
  });
  const adType = levelUp(name, jsType, infoType, 'info');
  return adType;
};

// -------------------------------------------------------------------- Type
const typeCandidates = [
  BuiltinType.info({ jsType: Type }),
];

Meta.Type = levelUp('Type', Type, UnionType.info({
  candidates: typeCandidates,
}), 'factor');

Meta.Types = SeqType.info({
  elmType: Meta.Type,
});

const type = function(name, jsType, attributes) {
  // information type
  const infoType = TupleType.info({
    heading: Heading.info({
      attributes: attributes.concat([metadataAttr]),
    }),
  });

  // corresponding ADT
  const adType = levelUp(name, jsType, infoType, 'info');

  // corresponding factory
  const factorType = TupleType.info({
    heading: Heading.info({
      attributes: [
        Attribute.info({ name: name.toLowerCase(), type: adType }),
      ],
    }),
  });

  typeCandidates.push(factorType);
  return adType;
};

// --------------------------------------------------------------- Attribute

Meta.Attribute = object('Attribute', Attribute, [
  Attribute.info({ name: 'name', type: Js.String }),
  Attribute.info({ name: 'type', type: Meta.Type }),
  Attribute.info({ name: 'required', type: Js.Boolean, required: false }),
]);
Meta.Attributes = SeqType.info({ elmType: Meta.Attribute });

// ----------------------------------------------------------------- Heading

Meta.AllowExtraOption = AdType.info({
  jsType: Type,
  contracts: [
    Contract.info({
      name: 'any',
      infoType: Js.Boolean,
      explicit: {
        dress: function(bool, world) {
          if (bool === true) {
            return new AnyType();
          } else {
            return false;
          }
        },
        undress: function(allowExtra, world) {
          // TODO
          throw new Error('`undress` not implemented');
        },
      },
    }),
    Contract.info({
      name: 'static',
      infoType: UnionType.info({
        candidates: typeCandidates,
      }),
      explicit: {
        dress: function(value, world) {
          return Meta.Type.dress(value, world);
        },
        undress: function(allowExtra, world) {
          // TODO
          throw new Error('`undress` not implemented');
        },
      },
    }),
  ],
});

Meta.BackwardCompatibleAllowExtraOption = UnionType.info({
  candidates: [Meta.Type, Js.Boolean],
  name: 'BackwardCompatibleAllowExtraOption',
});

Meta.HeadingOptions = TupleType.info({
  heading: Heading.info({
    attributes: [
      Attribute.info({ name: 'allowExtra', type: Meta.AllowExtraOption }),
    ],
  }),
});

Meta.Heading = object('Heading', Heading, [
  Attribute.info({ name: 'attributes', type: Meta.Attributes }),
  Attribute.info({ name: 'options', type: Meta.HeadingOptions, required: false }),
]);

// ---------------------------------------------------------------- Contract

Meta.Contract = UnionType.info({
  candidates: [],
  name: 'Contract',
});
Meta.Contracts = SeqType.info({ elmType: Meta.Contract });

const contract = function(name, jsType, attributes) {
  const c = object(name, Contract, attributes.concat([
    Attribute.info({ name: 'name', type: Js.String }),
    Attribute.info({ name: 'infoType', type: Meta.Type }),
  ]));
  Meta.Contract.candidates.push(c);
  return c;
};

Meta.Contract.Explicit = contract('Explicit', Contract.Explicit, [
  Attribute.info({
    name: 'explicit',
    type: TupleType.info({
      heading: Heading.info({
        attributes: [
          Attribute.info({ name: 'dress', type: Js.Function }),
          Attribute.info({ name: 'undress', type: Js.Function }),
        ],
      }),
    }),
  }),
]);

Meta.Contract.Internal = contract('Internal', Contract.Internal, [
  Attribute.info({ name: 'internal', type: Js.Type }),
]);

Meta.Contract.External = contract('External', Contract.External, [
  Attribute.info({ name: 'external', type: Js.Type }),
]);

Meta.Contract.Identity = contract('Identity', Contract.Identity, [
  Attribute.info({ name: 'identity', type: Js.Empty }),
]);

// -------------------------------------------------------------- Constraint

Meta.Constraint = UnionType.info({
  candidates: [],
  name: 'Constraint',
});
Meta.Constraints = SeqType.info({ elmType: Meta.Constraint });

const constraint = function(name, jsType, attributes) {
  const c = object(name, Constraint, attributes.concat([
    Attribute.info({ name: 'name', type: Js.String, required: false }),
  ]));
  Meta.Constraint.candidates.push(c);
  return c;
};

Meta.Constraint.Native = constraint('Native', Constraint.Native, [
  Attribute.info({ name: 'native', type: Js.Function }),
]);

Meta.Constraint.Regexp = constraint('RegExp', Constraint.Regexp, [
  Attribute.info({ name: 'regexp', type: Js.RegExp }),
]);

Meta.Range = UnionType.info({
  candidates: [
    TupleType.info({
      heading: Heading.info({
        attributes: [
          Attribute.info({ name: 'min', type: Js.Number }),
          Attribute.info({ name: 'min_inclusive', type: Js.Boolean }),
          Attribute.info({ name: 'max', type: Js.Number }),
          Attribute.info({ name: 'max_inclusive', type: Js.Boolean }),
        ],
      }),
    }),
    TupleType.info({
      heading: Heading.info({
        attributes: [
          Attribute.info({ name: 'min', type: Js.Number }),
          Attribute.info({ name: 'min_inclusive', type: Js.Boolean }),
        ],
      }),
    }),
  ],
  name: 'Range',
});

Meta.Constraint.Range = constraint('Range', Constraint.Range, [
  Attribute.info({ name: 'range', type: Meta.Range }),
]);

Meta.Constraint.Set = constraint('Set', Constraint.Set, [
  Attribute.info({ name: 'set', type: Js.Array }),
]);

// ------------------------------------------------------------------- Types

Meta.AnyType = type('Any', AnyType, [
]);

Meta.AdType = type('Adt', AdType, [
  Attribute.info({ name: 'jsType', type: Js.Type, required: false }),
  Attribute.info({ name: 'contracts', type: Meta.Contracts }),
]);

Meta.BuiltinType = type('Builtin', BuiltinType, [
  Attribute.info({ name: 'jsType', type: Js.Type }),
]);

Meta.SubType = type('Sub', SubType, [
  Attribute.info({ name: 'superType', type: Meta.Type }),
  Attribute.info({ name: 'constraints', type: Meta.Constraints }),
]);

Meta.RelationType = type('Relation', RelationType, [
  Attribute.info({ name: 'heading', type: Meta.Heading }),
]);

Meta.TupleType = type('Tuple', TupleType, [
  Attribute.info({ name: 'heading', type: Meta.Heading }),
]);

Meta.SeqType = type('Seq', SeqType, [
  Attribute.info({ name: 'elmType', type: Meta.Type }),
]);

Meta.SetType = type('Set', SetType, [
  Attribute.info({ name: 'elmType', type: Meta.Type }),
]);

Meta.StructType = type('Struct', StructType, [
  Attribute.info({ name: 'componentTypes', type: Meta.Types }),
]);

Meta.UnionType = type('Union', UnionType, [
  Attribute.info({ name: 'candidates', type: Meta.Types }),
]);

Meta.TypeRef = type('Ref', TypeRef, [
  Attribute.info({ name: 'typeName', type: Js.String }),
]);

// ------------------------------------------------------------------ System

Meta.TypeDef = object('TypeDef', TypeDef, [
  Attribute.info({ name: 'name', type: Js.String }),
  Attribute.info({ name: 'type', type: Meta.Type }),
]);
Meta.TypeDefs = SeqType.info({ elmType: Meta.TypeDef });

const systemAttrs = [
  Attribute.info({ name: 'types', type: Meta.TypeDefs }),
];
Meta.System = object('System', System, systemAttrs);
Meta.Systems = SeqType.info({ elmType: Meta.System });

Meta.Import = object('Import', Import, [
  Attribute.info({ name: 'qualifier', type: Js.String, required: false }),
  Attribute.info({ name: 'from', type: Js.String }),
]);
Meta.Imports = SeqType.info({ elmType: Meta.Import });

systemAttrs.push(Attribute.info({ name: 'imports', type: Meta.Imports, required: false }));

export default Meta;
