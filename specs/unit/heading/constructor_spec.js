import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import should from 'should';
import { intType } from '../../spec_helpers';

describe('Heading#constructor', () => {

  const subject = attributes => new Heading(attributes);

  it('with no attribute', () => subject([]).should.be.an.instanceof(Heading));

  it('with valid attributes', () => {
    const attrs = [new Attribute('red', intType)];
    return subject(attrs).should.be.an.instanceof(Heading);
  });

  describe('with invalid attributes', () => {
    const attributes = [
      new Attribute('red', intType),
      new Attribute('red', intType),
    ];

    const lambda = () => subject(attributes);

    it('should raise an error', () => {
      should(lambda).throw();
      try {
        lambda();
        return true.should.equal(false);
      } catch (e) {
        return e.message.should.equal('Attribute names must be unique');
      }
    });
  });

  return describe('with options at construction time', () => it('supports them', () => {
    const attrs = [new Attribute('red', intType)];
    const heading = new Heading(attrs, { allowExtra: intType });
    return heading.allowExtra().should.equal(true);
  }));
});
