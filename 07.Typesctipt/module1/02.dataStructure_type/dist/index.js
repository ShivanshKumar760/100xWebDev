"use strict";
let names = ["mario", "luigi", "gambit"]; //names varaible hold array which can
//only hold element of type string
let age = [16, 17, 18, 19]; //age is the variable holding array which can only hold 
//element of type string
// age.push("mike");//this will throw an error:Argument of type 'string' is not assignable to parameter of type 'num
console.log(names);
console.log(age);
//type inference of variable using array element :
let fname = names[0]; //this fname will infer the type of element that names array store 
//and since names array store only string element the datatype assignable to fname
//will be string we cannot assign number or boolean value
// fname=10;//Type 'number' is not assignable to type 'string'.ts(2322)
// let fname: string
console.log("fname is:", fname);
console.log(typeof fname);
//array with multiple data type:
let multipleTypeContainer = [1, "hello", true];
//the type infer by typescript for multipleTypeContainer will be :
//let multipleTypeContainer: (string | number | boolean)[] this 
//so basically this multipleTypeContainer is of union type that is it is a union
//of multiple data type
//so when we try to access a single element from a union data strucutre and assign 
//it to a variable then the data infer by the varaible will also be union:
let single_ItemFrom_multipleTypeContainer = multipleTypeContainer[0];
// let single_ItemFrom_multipleTypeContainer: string | number | boolean
console.log(typeof single_ItemFrom_multipleTypeContainer);
