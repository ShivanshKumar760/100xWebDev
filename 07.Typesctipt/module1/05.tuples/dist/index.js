"use strict";
//tuples
//So tuples are kinda of like an array but not an  array:
//Where array can have hetrogenous and homogenous element in no perticular order 
//and if type are added array can have only homogenous element
//but a tuple even with type can have hetrogenous element but in prescibed order
let tupleContainer; //so the data should appear in this format 
//only first string then number and at last boolean no changes and the container 
//should only have that number of element which reflected by the total number of
//datatypes specified like above 3 are specified so only 3 element 
tupleContainer = ["Shivansh", 20, true];
console.log(tupleContainer);
//tuples return type in function:
function useCoords() {
    const lat = 500;
    const long = 100;
    return [lat, long];
}
console.log(useCoords());
const [lat, long] = useCoords();
console.log(lat);
console.log(long);
//we can even give named tuples that label to our tuples element type to let the other 
//programmer know that what does this tuple value signify
let user;
user = ["Shivansh", 19];
console.log(user);
//and we can get values from the tuple just like array:
console.log(user[0]);
