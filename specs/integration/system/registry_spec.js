import { Finitio, should } from '../helpers';

describe('System\'s registry', () => it('installs the true type, not the type def', () => {
  const system = Finitio.system('Posint = .Number(i | i>0)');
  return should(system.Posint).be.an.instanceof(Finitio.SubType);
}));
