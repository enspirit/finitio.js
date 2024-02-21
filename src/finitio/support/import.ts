import { ObjectType } from '../support/ic';

class Import {

  constructor(public from: unknown, public qualifier: unknown) {
  }
}

ObjectType(Import, ['from', 'qualifier'], (imp, world) => imp.system = world.importResolver(imp.from, world));

export default Import;
