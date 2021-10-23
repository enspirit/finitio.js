import BuiltinType from '../../../../src/finitio/type/builtin_type';
import should from 'should';

describe('BuiltinType\'s information contract', () => {

  const info = {
    jsType: Date,
    metadata: { foo: 'bar' },
  };
  const type = BuiltinType.info(info);

  it('dresses as expected', () => {
    should(type).be.an.instanceof(BuiltinType);
    should(type.jsType).equal(Date);
    return should(type.metadata).eql({ foo: 'bar' });
  });

  it('undresses as expected', () => should(type.toInfo()).eql(info));
});
