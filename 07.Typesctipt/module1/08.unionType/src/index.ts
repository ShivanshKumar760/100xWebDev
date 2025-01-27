//union basically means a variable in typescript can hold more than one or more 
//types of  data:


let holdeNumberOrString:number|string;

holdeNumberOrString=9;
console.log(holdeNumberOrString);

holdeNumberOrString="this is a string not a number now";
console.log(holdeNumberOrString);

//we can do this with type:

type Id=number|string;

let anotherId:Id;
anotherId=10;
console.log(anotherId);

anotherId="vbobgor9";
console.log(anotherId);