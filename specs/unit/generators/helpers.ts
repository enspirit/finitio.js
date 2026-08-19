import type {
  AdTypeAst, RelationTypeAst, SeqTypeAst, StructTypeAst, TupleTypeAst, TypeAst,
} from '../../../src/types'

export const struct: StructTypeAst = {
  struct: {
    componentTypes: [{
      any: {}
    }, {
      builtin: { jsType: 'String' }
    }]
  }
}

export const tuple: TupleTypeAst = {
  tuple: {
    heading: {
      attributes: [{
        name: 'foo',
        type: { any: {}}
      }, {
        name: 'bar',
        type: { any: {}},
        required: false
      }]
    }
  }
}

export const relation: RelationTypeAst = {
  relation: {
    heading: {
      attributes: [{
        name: 'foo',
        type: { any: {}}
      }, {
        name: 'bar',
        type: { any: {}},
        required: false
      }]
    }
  }
}

export const adt: AdTypeAst = {
  adt: {
    jsType: 'Date',
    contracts: [{
      name: 'iso8601',
      identity: {},
      infoType: {
        builtin: {
          jsType: 'String'
        }
      }
    }, {
      name: 'miliseconds',
      identity: {},
      infoType: {
        builtin: {
          jsType: 'Number'
        }
      }
    }]
  }
}

// An ADT over a JS class the generator cannot name by itself.
export const opaqueAdt: AdTypeAst = {
  adt: {
    jsType: 'Field',
    contracts: [{
      name: 'raw',
      identity: {},
      infoType: {
        builtin: { jsType: 'String' }
      }
    }]
  }
}

export const seqOfGeneric: SeqTypeAst = {
  seq: {
    elmType: {
      ref: { typeName: 'T' }
    }
  }
}

export const collectionTDate: TypeAst = {'tuple':{'heading':{'attributes':[{'name':'items','type':{'seq':{'elmType':{'ref':{'typeName':'T'}}}}},{'name':'lastUpdate','type':{'ref':{'typeName':'Date'}}}]}}}
