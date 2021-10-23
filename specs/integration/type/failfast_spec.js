import { Finitio, should } from '../helpers';

describe('Type#dress, fail fast option', () => {

  const system = Finitio.system('Posint = .Number(i | i>0)\n{{ age: Posint }}');

  return context('when set', () => {
    const subject = () => system.dress([{ age: -12 }, { age: 'foo' }], { failfast: true });

    it('throws', () => should(subject).throw());

    it('stops at the first error', () => {
      try {
        subject();
        return should('not here').eql('');
      } catch (e) {
        return should(e.causes.length).eql(1);
      }
    });
  });
});
