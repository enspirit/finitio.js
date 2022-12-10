type UUID = string;

type PosInt = number;

type RGBColour = [PosInt, PosInt, PosInt];

type Hobbies = Set<string>;

type Person = {
id : UUID,
firstName : string,
lastName : string,
age ?: PosInt,
colour : RGBColour
};
