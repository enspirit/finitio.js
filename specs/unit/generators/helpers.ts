import type { AdTypeAst, RelationTypeAst, StructTypeAst, TupleTypeAst, TypeAst } from '../../../src/types'

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

export const collectionTDate: TypeAst = {'tuple':{'heading':{'attributes':[{'name':'items','type':{'seq':{'elmType':{'ref':{'typeName':'T'}}}}},{'name':'lastUpdate','type':{'ref':{'typeName':'Date'}}}]}}}

