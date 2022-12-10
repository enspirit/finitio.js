import fs from 'fs';
import should from 'should';
import TypescriptGenerator from '../../../src/finitio/generators/typescript';
import BuiltinType from '../../../src/finitio/type/builtin_type';
import UnionType from '../../../src/finitio/type/union_type';
import SeqType from '../../../src/finitio/type/seq_type';
import SetType from '../../../src/finitio/type/set_type';
import SubType from '../../../src/finitio/type/sub_type';
import StructType from '../../../src/finitio/type/struct_type';
import Attribute from '../../../src/finitio/support/attribute';
import Heading from '../../../src/finitio/support/heading';
import Constraint from '../../../src/finitio/support/constraint';
import TupleType from '../../../src/finitio/type/tuple_type';
import RelationType from '../../../src/finitio/type/relation_type';
import { anyType, numType, boolType, stringType, floatType } from '../../spec_helpers';
import AdType from '../../../src/finitio/type/ad_type';
import TypeRef from '../../../src/finitio/type/type_ref';
import Finitio from '../../../src/finitio';
import path from 'path';

class MyCustomClass {}

describe('TypescriptGenerator', () => {

  describe('toTypescript(AnyType)', () => {
    it('gives us a valid typescript representation', () => {
      should(TypescriptGenerator.generate(anyType, Finitio.World.JsTypes)).equal('any');
    });
  });

  describe('toTypescript(BuiltinType)', () => {
    it('gives us a valid typescript representation of primitives', () => {
      should(TypescriptGenerator.generate(numType, Finitio.World.JsTypes)).equal('number');
      should(TypescriptGenerator.generate(stringType, Finitio.World.JsTypes)).equal('string');
      should(TypescriptGenerator.generate(boolType, Finitio.World.JsTypes)).equal('boolean');
    });
    it('gives us a valid typescript representation of custom classes', () => {
      const myType = new BuiltinType(MyCustomClass);
      should(TypescriptGenerator.generate(myType, Finitio.World.JsTypes)).equal('MyCustomClass');
    });
  });

  describe('toTypescript(UnionType)', () => {
    it('gives us a valid typescript representation', () => {
      const myType = new BuiltinType(MyCustomClass);
      const unionType = new UnionType([myType, stringType, anyType]);

      should(TypescriptGenerator.generate(unionType, Finitio.World.JsTypes)).equal('MyCustomClass | string | any');
    });
  });

  describe('toTypescript(SeqType)', () => {
    it('gives us a valid typescript representation', () => {
      const seqType = new SeqType(stringType);

      should(TypescriptGenerator.generate(seqType, Finitio.World.JsTypes)).equal('string[]');
    });
  });

  describe('toTypescript(SetTYpe)', () => {
    it('gives us a valid typescript representation', () => {
      const seqType = new SetType(stringType);

      should(TypescriptGenerator.generate(seqType, Finitio.World.JsTypes)).equal('Set<string>');
    });
  });

  describe('toTypescript(StructType)', () => {
    it('gives us a valid typescript representation', () => {
      const myType = new BuiltinType(MyCustomClass);
      const structType = new StructType([stringType, boolType, myType]);

      should(TypescriptGenerator.generate(structType, Finitio.World.JsTypes)).equal('[string, boolean, MyCustomClass]');
    });
  });

  describe('toTypescript(TupleType)', () => {
    it('gives us a valid typescript representation of basic tuples', () => {
      const attributes = [
        // mandatory
        new Attribute('name', stringType, true),
        // optional
        new Attribute('age', numType, false),
      ];
      const heading = new Heading(attributes);
      const tuple = new TupleType(heading);

      should(TypescriptGenerator.generate(tuple, Finitio.World.JsTypes))
        .equal('{\nname : string,\nage ?: number\n}');
    });

    it('gives us a valid typescript representation of tuples with allowExtra: any', () => {
      const attributes = [
        // mandatory
        new Attribute('name', stringType, true),
        // optional
        new Attribute('age', numType, false),
      ];
      const heading = new Heading(attributes, { allowExtra: anyType });
      const tuple = new TupleType(heading);

      should(TypescriptGenerator.generate(tuple, Finitio.World.JsTypes))
        .equal('{\nname : string,\nage ?: number\n} & { [key: string]: any }');
    });

    it('gives us a valid typescript representation of tuples with allowExtra: string', () => {
      const attributes = [
        // mandatory
        new Attribute('name', stringType, true),
        // optional
        new Attribute('age', numType, false),
      ];
      const heading = new Heading(attributes, { allowExtra: stringType });
      const tuple = new TupleType(heading);

      should(TypescriptGenerator.generate(tuple, Finitio.World.JsTypes))
        .equal('{\nname : string,\nage ?: number\n} & { [key: string]: string }');
    });
  });

  describe('toTypescript(RelationType)', () => {
    it('gives us a valid typescript representation of basic relations', () => {
      const attributes = [
        // mandatory
        new Attribute('name', stringType, true),
        // optional
        new Attribute('age', numType, false),
      ];
      const heading = new Heading(attributes);
      const tuple = new RelationType(heading);

      should(TypescriptGenerator.generate(tuple, Finitio.World.JsTypes))
        .equal('Set<{\nname : string,\nage ?: number\n}>');
    });

    it('gives us a valid typescript representation of relations with allowExtra: any', () => {
      const attributes = [
        // mandatory
        new Attribute('name', stringType, true),
        // optional
        new Attribute('age', numType, false),
      ];
      const heading = new Heading(attributes, { allowExtra: anyType });
      const tuple = new RelationType(heading);

      should(TypescriptGenerator.generate(tuple, Finitio.World.JsTypes))
        .equal('Set<{\nname : string,\nage ?: number\n} & { [key: string]: any }>');
    });

    it('gives us a valid typescript representation of relations with allowExtra: string', () => {
      const attributes = [
        // mandatory
        new Attribute('name', stringType, true),
        // optional
        new Attribute('age', numType, false),
      ];
      const heading = new Heading(attributes, { allowExtra: stringType });
      const tuple = new RelationType(heading);

      should(TypescriptGenerator.generate(tuple, Finitio.World.JsTypes))
        .equal('Set<{\nname : string,\nage ?: number\n} & { [key: string]: string }>');
    });
  });

  describe('toTypescript(SubType)', () => {
    it('gives us a valid typescript representation of primitives superType', () => {
      should(TypescriptGenerator.generate(floatType, Finitio.World.JsTypes)).equal('number');
    });

    it('gives us a valid typescript representation of custom superType', () => {
      const myType = new BuiltinType(MyCustomClass);
      const fakeConstraint = new Constraint.Native('fake', i => i);
      const customSubType = new SubType(myType, [fakeConstraint]);
      should(TypescriptGenerator.generate(customSubType, Finitio.World.JsTypes)).equal('MyCustomClass');
    });
  });

  describe('toTypescript(AdType)', () => {
    it('gives us a valid typescript representation of subjacent primitives', () => {
      let adType = new AdType(Number, []);
      should(TypescriptGenerator.generate(adType, Finitio.World.JsTypes)).equal('number');
      adType = new AdType(String, []);
      should(TypescriptGenerator.generate(adType, Finitio.World.JsTypes)).equal('string');
      adType = new AdType(Boolean, []);
      should(TypescriptGenerator.generate(adType, Finitio.World.JsTypes)).equal('boolean');
    });
    it('gives us a valid typescript representation of custom classes', () => {
      const adType = new AdType(MyCustomClass, []);
      should(TypescriptGenerator.generate(adType, Finitio.World.JsTypes)).equal('MyCustomClass');
    });
  });
  describe('toTypescript(AdType)', () => {
    it('gives us a valid typescript representation of subjacent primitives', () => {
      let adType = new AdType(Number, []);
      should(TypescriptGenerator.generate(adType, Finitio.World.JsTypes)).equal('number');
      adType = new AdType(String, []);
      should(TypescriptGenerator.generate(adType, Finitio.World.JsTypes)).equal('string');
      adType = new AdType(Boolean, []);
      should(TypescriptGenerator.generate(adType, Finitio.World.JsTypes)).equal('boolean');
    });
    it('gives us a valid typescript representation of custom classes', () => {
      const adType = new AdType(MyCustomClass, []);
      should(TypescriptGenerator.generate(adType, Finitio.World.JsTypes)).equal('MyCustomClass');
    });
  });

  describe('toTypescript(TypeRef)', () => {
    it('gives us a valid typescript type definition', () => {
      let typeRef = new TypeRef('UUID', {}, stringType) ;
      should(TypescriptGenerator.generate(typeRef, { 'UUID': stringType })).equal('UUID');

      const attributes = [
        // mandatory
        new Attribute('name', stringType, true),
        // optional
        new Attribute('age', numType, false),
      ];
      const heading = new Heading(attributes, { allowExtra: stringType });
      const tuple = new RelationType(heading);

      typeRef = new TypeRef('test', {}, tuple) ;
      should(TypescriptGenerator.generate(typeRef, { test: tuple }))
        .equal('test');
    });
  });

  describe('toTypscript(Finitio.System)', () => {
    it('gives us a valid typescript type definition', () => {
      const schema = Finitio.system(fs.readFileSync(path.join(__dirname, 'example.fio')).toString());
      const expected = fs.readFileSync(path.join(__dirname, 'example.ts')).toString();

      const ts = TypescriptGenerator.generate(schema, Finitio.World.JsTypes);
      should(ts.trim())
        .equal(expected.trim());
    });
  });

});
