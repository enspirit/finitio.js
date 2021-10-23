import Parser from '../../../../src/finitio/parser';
import should from 'should';

describe('Parser#ad_type', () => {

  const parse = source => Parser.parse(source, { startRule: 'type' });

  it('works with an identity contract', () => {
    const s = parse('<iso> .String');
    const expected = { adt: {
      contracts: [
        {
          name: 'iso',
          infoType: { builtin: { jsType: 'String' } },
          identity: {},
        },
      ],
    } };
    return should(s).eql(expected);
  });

  it('works with an internal contract', () => {
    const s = parse('.Number <iso> .String');
    const expected = { adt: {
      jsType: 'Number',
      contracts: [
        {
          name: 'iso',
          infoType: { builtin: { jsType: 'String' } },
          internal: 'Number',
        },
      ],
    } };
    return should(s).eql(expected);
  });

  it('works with an external contract', () => {
    const s = parse('.Number <iso> .String .Foo.Bar.Baz');
    const expected = { adt: {
      jsType: 'Number',
      contracts: [
        {
          name: 'iso',
          infoType: { builtin: { jsType: 'String' } },
          external: 'Foo.Bar.Baz',
        },
      ],
    } };
    return should(s).eql(expected);
  });

  it('works with an explicit contract', () => {
    const s = parse('.Number <iso> .String \\( d | foo(d) ) \\( u | bar(u) )');
    const expected = { adt: {
      jsType: 'Number',
      contracts: [
        {
          name: 'iso',
          infoType: { builtin: { jsType: 'String' } },
          explicit: {
            dress: ['d', 'foo(d)'],
            undress: ['u', 'bar(u)'],
          },
        },
      ],
    } };
    return should(s).eql(expected);
  });

  it('works with identity + metadata', () => {
    const s = parse('/- Foo -/ <iso> .String');
    const expected = { adt: {
      contracts: [
        {
          name: 'iso',
          infoType: { builtin: { jsType: 'String' } },
          identity: {},
          metadata: { description: 'Foo' },
        },
      ],
    } };
    return should(s).eql(expected);
  });

  it('works with internal + metadata', () => {
    const s = parse('/- Foo -/ .Bar <iso> .String');
    const expected = { adt: {
      jsType: 'Bar',
      contracts: [
        {
          name: 'iso',
          infoType: { builtin: { jsType: 'String' } },
          internal: 'Bar',
        },
      ],
      metadata: { description: 'Foo' },
    } };
    return should(s).eql(expected);
  });

  it('works with contract metadata', () => {
    const s = parse('.Bar /- Foo -/ <iso> .String');
    const expected = { adt: {
      jsType: 'Bar',
      contracts: [
        {
          name: 'iso',
          infoType: { builtin: { jsType: 'String' } },
          internal: 'Bar',
          metadata: { description: 'Foo' },
        },
      ],
    } };
    return should(s).eql(expected);
  });
});

