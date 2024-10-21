
//to define a array we use the same technique that we use to declare variable let followed by
//variable name to store array:In js array is denoted using square braces

/*unlike java or c++ array element can be of anytime that in js type restriction is null*/
let yourArray=[1,"2","shivansh",true,false,Symbol("a"),3.15];
console.log(yourArray)

//to find the length of array we use the same property as of string that is .length
console.log(yourArray.length);
//array element are labeled from 0 to length(array)-1 and this labeling is known as indexing and we can access element of array
//using indexing 

/*
    to access array element we use square notation bracket:arrayName[index] or arrayName[positionOf_element-1]*/

console.log(yourArray[2-1]);
console.log(typeof yourArray[2-1]);