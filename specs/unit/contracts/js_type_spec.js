import should from 'should';
import JsType from '../../../src/finitio/contracts/js_type';

describe('JsType#dress', () => {

  it('resolves standard constants without a world', () => should(JsType.name.dress('Boolean')).eql(Boolean));

  it('restricts to the world if provided', () => should(JsType.name.dress('Boolean', { 'Boolean': String })).eql(String));
});
