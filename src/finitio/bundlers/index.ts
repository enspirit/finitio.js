import TypescriptBundler from './TypescriptBundler';
import JavascriptBundler from './JavascriptBundler';
import type { World } from '../../types';

export enum TargetLanguage {
  Javascript = 'javascript',
  Typescript = 'typescript',
}

export const getBundler = (lang: TargetLanguage, world: World) => {
  switch (lang) {
    case TargetLanguage.Javascript:
      return new JavascriptBundler(world);
    case TargetLanguage.Typescript:
      return new TypescriptBundler(world);

    default:
      throw new Error(`Bundling for ${lang} is unsupported`);
  }
}
