module.exports = (function(){
  var $u           = require('../support/utils');
  var Attribute    = require('../support/attribute');
  var Heading      = require('../support/heading');
  var Contract     = require('../support/contract');
  var Constraint   = require('../support/constraint');
  var Import       = require('../support/import');
  var Contracts    = require('../contracts');
  var Type         = require('../type');
  var AdType       = require('../type/ad_type');
  var BuiltinType  = require('../type/builtin_type');
  var TupleType    = require('../type/tuple_type');
  var RelationType = require('../type/relation_type');
  var UnionType    = require('../type/union_type');
  var SeqType      = require('../type/seq_type');
  var SetType      = require('../type/set_type');
  var AnyType      = require('../type/any_type');
  var StructType   = require('../type/struct_type');
  var SubType      = require('../type/sub_type');
  var TypeRef      = require('../type/type_ref');
  var TypeDef      = require('../type/type_def');
  var System       = require('../system');

  var Js   = {};
  var Meta = { Js: Js };

  // -------------------------------------------------------------- Javascript

  Js.Object  = BuiltinType.info({ jsType: Object  });

  Js.String  = BuiltinType.info({ jsType: String  });

  Js.Boolean = BuiltinType.info({ jsType: Boolean });

  Js.Number = BuiltinType.info({ jsType: Number });

  Js.Type = AdType.info({
    jsType: Function,
    contracts: [
      Contract.info({
        name: 'jsTypeName',
        infoType: Js.String,
        explicit: {
          dress: function(name, world){
            return Contracts.JsType.name.dress(name, world.JsTypes);
          },
          undress: Contracts.JsType.name.undress
        }
      })
    ]
  });

  Js.Empty = SubType.info({
    superType: AnyType.info({}),
    constraints: [
      Constraint.info({
        name: "default",
        native: function(v){
          if (v===null || v===undefined){ return false; }
          for (k in v){ return false; }
          return true;
        }
      })
    ]
  });

  // --------------------------------------------------------------- Functions
  Js.FunctionDefn = SeqType.info({elmType: Js.String});
  Js.Function = AdType.info({
    jsType: Function,
    contracts: [
      Contract.info({
        name:      'defn',
        infoType:  Js.FunctionDefn,
        external:  Contracts.Expression.defn
      })
    ]
  });

  // ----------------------------------------------------------------- RegExps

  Js.RegExp = AdType.info({
    jsType: RegExp,
    contracts: [
      Contract.info({
        name:      'src',
        infoType:  Js.String,
        explicit: {
          dress:   function(src){ return new RegExp(src) },
          undress: function(rx) { return rx.source;  }
        }
      })
    ]
  })

  // ------------------------------------------------------------------ Shared

  var metadataAttr = Attribute.info({
    name: 'metadata',
    type: Js.Object,
    required: false
  });

  // ------------------------------------------------------------------- Tools

  var levelUp = function(name, jsType, infoType, contractName){
    return AdType.info({
      jsType: jsType,
      contracts: [
        Contract.info({
          name:      contractName,
          infoType:  infoType,
          internal:  jsType
        })
      ]
    });
  };

  var object = function(name, jsType, attributes){
    attributes.push(metadataAttr);
    var infoType = TupleType.info({
      heading: Heading.info({ attributes: attributes })
    });
    var adType = levelUp(name, jsType, infoType, 'info');
    return adType;
  };

  // -------------------------------------------------------------------- Type
  var typeCandidates = [
    BuiltinType.info({ jsType: Type })
  ];

  Meta.Type = levelUp('Type', Type, UnionType.info({
    candidates: typeCandidates
  }), 'factor');

  Meta.Types = SeqType.info({
    elmType: Meta.Type
  });

  var type = function(name, jsType, attributes){
    // information type
    var infoType = TupleType.info({
      heading: Heading.info({
        attributes: attributes.concat([ metadataAttr ])
      })
    });

    // corresponding ADT
    var adType = levelUp(name, jsType, infoType, 'info');

    // corresponding factory
    var factorType = TupleType.info({
      heading: Heading.info({
        attributes: [
          Attribute.info({ name: name.toLowerCase(), type: adType })
        ]
      })
    });

    typeCandidates.push(factorType);
    return adType;
  };

  // --------------------------------------------------------------- Attribute

  Meta.Attribute = object('Attribute', Attribute, [
    Attribute.info({ name: 'name',     type: Js.String  }),
    Attribute.info({ name: 'type',     type: Meta.Type  }),
    Attribute.info({ name: 'required', type: Js.Boolean, required: false })
  ]);
  Meta.Attributes = SeqType.info({ elmType: Meta.Attribute });

  // ----------------------------------------------------------------- Heading

  Meta.HeadingOptions = TupleType.info({
    heading: Heading.info({
      attributes: [
        Attribute.info({ name: 'allowExtra', type: Js.Boolean })
      ]
    })
  });

  Meta.Heading = object('Heading', Heading, [
    Attribute.info({ name: 'attributes', type: Meta.Attributes     }),
    Attribute.info({ name: 'options',    type: Meta.HeadingOptions, required: false })
  ]);

  // ---------------------------------------------------------------- Contract

  Meta.Contract = UnionType.info({
    candidates: [],
    name: 'Contract'
  });
  Meta.Contracts = SeqType.info({ elmType: Meta.Contract });

  var contract = function(name, jsType, attributes){
    var c = object(name, Contract, attributes.concat([
      Attribute.info({ name: 'name',      type: Js.String   }),
      Attribute.info({ name: 'infoType',  type: Meta.Type   }),
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
            Attribute.info({ name: "dress",   type: Js.Function }),
            Attribute.info({ name: "undress", type: Js.Function })
          ]
        })
      })
    })
  ]);

  Meta.Contract.Internal = contract('Internal', Contract.Internal, [
    Attribute.info({ name: 'internal', type: Js.Type })
  ]);

  Meta.Contract.External = contract('External', Contract.External, [
    Attribute.info({ name: 'external', type: Js.Type })
  ]);

  Meta.Contract.Identity = contract('Identity', Contract.Identity, [
    Attribute.info({ name: 'identity', type: Js.Empty })
  ]);

  // -------------------------------------------------------------- Constraint

  Meta.Constraint = UnionType.info({
    candidates: [],
    name: 'Constraint'
  });
  Meta.Constraints = SeqType.info({ elmType: Meta.Constraint });

  var constraint = function(name, jsType, attributes){
    var c = object(name, Constraint, attributes.concat([
      Attribute.info({ name: 'name', type: Js.String, required: false })
    ]));
    Meta.Constraint.candidates.push(c);
    return c;
  };

  Meta.Constraint.Native = constraint('Native', Constraint.Native, [
    Attribute.info({ name: 'native', type: Js.Function })
  ]);

  Meta.Constraint.Regexp = constraint('RegExp', Constraint.Regexp, [
    Attribute.info({ name: 'regexp', type: Js.RegExp })
  ]);

  Meta.Range = UnionType.info({
    candidates: [
      TupleType.info({
        heading: Heading.info({
          attributes: [
            Attribute.info({ name: 'min', type: Js.Number }),
            Attribute.info({ name: 'min_inclusive', type: Js.Boolean }),
            Attribute.info({ name: 'max', type: Js.Number }),
            Attribute.info({ name: 'max_inclusive', type: Js.Boolean })
          ]
        })
      }),
      TupleType.info({
        heading: Heading.info({
          attributes: [
            Attribute.info({ name: 'min', type: Js.Number }),
            Attribute.info({ name: 'min_inclusive', type: Js.Boolean }),
          ]
        })
      })
    ],
    name: 'Range'
  });

  Meta.Constraint.Range = constraint('Range', Constraint.Range, [
    Attribute.info({ name: 'range', type: Meta.Range })
  ]);

  // ------------------------------------------------------------------- Types

  Meta.AnyType = type('Any', AnyType, [
  ]);

  Meta.AdType = type('Adt', AdType, [
    Attribute.info({ name: 'jsType',    type: Js.Type, required: false }),
    Attribute.info({ name: 'contracts', type: Meta.Contracts })
  ]);

  Meta.BuiltinType = type('Builtin', BuiltinType, [
    Attribute.info({ name: 'jsType', type: Js.Type })
  ]);

  Meta.SubType = type('Sub', SubType, [
    Attribute.info({ name: 'superType',   type: Meta.Type }),
    Attribute.info({ name: 'constraints', type: Meta.Constraints })
  ]);

  Meta.RelationType = type('Relation', RelationType, [
    Attribute.info({ name: 'heading', type: Meta.Heading })
  ]);

  Meta.TupleType = type('Tuple', TupleType, [
    Attribute.info({ name: 'heading', type: Meta.Heading })
  ]);

  Meta.SeqType = type('Seq', SeqType, [
    Attribute.info({ name: 'elmType', type: Meta.Type })
  ]);

  Meta.SetType = type('Set', SetType, [
    Attribute.info({ name: 'elmType', type: Meta.Type })
  ]);

  Meta.StructType = type('Struct', StructType, [
    Attribute.info({ name: 'componentTypes', type: Meta.Types })
  ]);

  Meta.UnionType = type('Union', UnionType, [
    Attribute.info({ name: 'candidates', type: Meta.Types })
  ]);

  Meta.TypeRef = type('Ref', TypeRef, [
    Attribute.info({ name: 'typeName', type: Js.String })
  ]);

  // ------------------------------------------------------------------ System

  Meta.TypeDef = object('TypeDef', TypeDef, [
    Attribute.info({ name: 'name',  type: Js.String }),
    Attribute.info({ name: 'type',  type: Meta.Type }),
  ]);
  Meta.TypeDefs = SeqType.info({ elmType: Meta.TypeDef });

  var systemAttrs = [
    Attribute.info({ name: 'types', type: Meta.TypeDefs }),
  ];
  Meta.System  = object('System', System, systemAttrs);
  Meta.Systems = SeqType.info({ elmType: Meta.System });

  Meta.Import = object('Import', Import, [
    Attribute.info({ name: 'qualifier', type: Js.String, required: false }),
    Attribute.info({ name: 'from',      type: Js.String })
  ]);
  Meta.Imports = SeqType.info({ elmType: Meta.Import });

  systemAttrs.push(Attribute.info({ name: 'imports', type: Meta.Imports, required: false }));

  return Meta;
})();
