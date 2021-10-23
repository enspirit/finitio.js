module.exports = {
  'specs/integration/fixtures/low.fio': '@import finitio/data\n\n{\n  name       : String\n  releasedAt : Date\n}\n',
  'specs/integration/fixtures/recursive.fio': 'Logical = .Field <raw> {\n    id       :  .String\n    children :? [Logical]\n}\nPhysical = {\n    id        :  .String\n    children  :? [Physical]\n}\n',
  'specs/integration/fixtures/test.fio': '@import finitio/data\n\n{\n  name       : String\n  version    : String\n  releasedAt : Date\n}',
  'specs/integration/fixtures/test.json': '{ "types": [] }'
};
