import fs from './fixtures-jsed';
let defaultExport = {};
const Fixtures = (defaultExport = {});

export default defaultExport;

Fixtures.loadFile = path => fs[`specs/integration/fixtures/${path}`];
