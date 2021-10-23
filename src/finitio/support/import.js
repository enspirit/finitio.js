import { ObjectType } from '../support/ic';

class Import {

  constructor(from, qualifier) {
    this.from = from;
    this.qualifier = qualifier;
  }
}

ObjectType(Import, ['from', 'qualifier'], (imp, world) => imp.system = world.importResolver(imp.from, world));

export default Import;
