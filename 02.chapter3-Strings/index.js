//Declaring a string to declare a string we enclose a series of character in double or single qoute " " or ' ' 

let firstName="Shiv";
console.log(firstName);

//String Property :
//->String is a object and a object has method and properties ,string also has one important property and that is :
//.length-->which gives back the total number of character forming the string
console.log(firstName.length);

//accesing string character so as said string is a sequance of character and each character takes up its own 
//memory of 1 byte and each memory address is indexed from 0 to lenght of string-1
//firstName="Shiv"//length:4 index :0 to 3 ie 
//0->S
//1->h
//2->i
//3->v
console.log(firstName[2]);

//String methods :since string is a class/object it has property and method(function associated with object) 
//just  like length property which can be accessed by the dot(.) string has methods

console.log(firstName.toUpperCase());
console.log(firstName.toLowerCase());