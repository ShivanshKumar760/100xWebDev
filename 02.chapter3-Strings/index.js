//Declaring a string to declare a string we enclose a series of character in double or single qoute " " or ' ' 

let firstName="Shiiv";
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
//3->i
//4->v
console.log(firstName[2]);

//String methods :since string is a class/object it has property and method(function associated with object) 
//just  like length property which can be accessed by the dot(.) string has methods

console.log(firstName.toUpperCase());//capatilize every character
console.log(firstName.toLowerCase());//coverts every character to lower case 
console.log(firstName.indexOf('i'));//give me the first index of occurance i
console.log(firstName.lastIndexOf('i'));//gives back the index of last occurance of i

//some complicated string methods
let email="max@gmail.com";
// let sliceEmail=email.slice(start:0,end:5)//this will slice the string till 0 to end-1 ie 0 to 4
let sliceEmail=email.slice(0,5);
console.log(sliceEmail);

// let subString=email.substr(start:index,end:length/numberOfCharcterneeded);
let subString=email.substr(2,5);//start from index 2 and get me 5 character after index 2
console.log(subString);

let replaceWord=email.replace('m','w');//this will replace the very first inctance of m with w
console.log(replaceWord);