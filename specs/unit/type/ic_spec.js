import Type from '../../../src/finitio/type';
import BuiltinType from '../../../src/finitio/type/builtin_type';
import should from 'should';

describe('Type\'s information contract', () => {

  const info = {
    builtin: BuiltinType.info({
      jsType: Date,
      metadata: { foo: 'bar' },
    }),
  };
  const type = Type.factor(info);

  it('dresses as expected', () => {
    should(type).be.an.instanceof(BuiltinType);
    should(type.jsType).equal(Date);
    return should(type.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(type.toFactor()).eql(info));
});
