import TypeError from '../../src/finitio/errors';
import should from 'should';
import _ from 'underscore';

describe('TypeError', () => {

  const error = new TypeError({
    context: '{{x: Posint}}',
    typeName: 'Hobbies',
    error: ['Invalid ${typeName}', ['Relation']],
    children: [
      {
        location: 1,
        context: '{x: Posint}',
        error: ['Invalid ${typeName}', ['Tuple']],
        children: [
          {
            location: 'x',
            context: 'Posint',
            typeName: 'Posint',
            error: ['Invalid ${typeName}: ${value}', ['value', 'foo']],
            children: [
              {
                context: 'Integer',
                typeName: 'Integer',
                error: ['Invalid ${typeName}: `${value}`', ['value', 'foo']],
              },
            ],
          },
        ],
      },
      {
        location: 3,
        context: '{x: Posint}',
        error: ['Invalid ${typeName}', ['Tuple']],
        children: [
          {
            location: 'x',
            context: 'Posint',
            typeName: 'Posint',
            error: ['Invalid ${typeName} (not ${c}): `${value}`', ['value', 'positive', -12]],
          },
        ],
      },
    ],
  });

  it('has the expected message', () => {
    should(error.message).eql('Invalid Hobbies')
  });

  it('has the expected children', () => should(error.children.length).eql(2));

  it('has the expected root cause message', () => {
    should(error.rootCause.message).eql('Invalid Posint (not positive): `-12`')
  });

  it('provides the expected errors', () => {
    const expected = [
      { location: '1/x', message: 'Invalid Integer: `foo`' },
      { location: '3/x', message: 'Invalid Posint (not positive): `-12`' },
    ];
    should(error.rootCauses.length).eql(expected.length);

    const remaped = _.map(error.rootCauses, c => ({
      message: c.message,
      location: c.location,
    }));
    return should(remaped).eql(expected);
  });
});
