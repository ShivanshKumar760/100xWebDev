//Any type so basically if we assign a variable any type variable is actually free to take 
//up any value of any datatype:


let unchangeAble=8;//the type infer by the variable will number so we cannot 
//assign another datatype to the variable (unchangeAble)

let changeAble:any;//but since here the data type is any we can provide any datatype
//at any given point
changeAble=8;
console.log(changeAble);
changeAble=true;
console.log(changeAble);
//infer:
let inferChangeAble;//this varaible will also be treated as any type 
//cause we havent specified any value explicitly and  we have not initialized it 
//with any value:


inferChangeAble=9;
console.log(inferChangeAble);
inferChangeAble="Changed";

console.log(inferChangeAble)


//Object:

let obj:{fname:any,age:any}={
    fname:"Shivansh",
    age:"19"
};
console.log(obj);
console.log(obj.age,"type:",typeof obj.age)
obj.age=19;
console.log("Value updated!");
console.log(obj);
console.log(obj.age,"type:",typeof obj.age)


//Array
let anyItems:any[]=["Hello",19];
console.log(anyItems);
anyItems.push(true);
console.log(anyItems);

//functions:

function add(p1:any,p2:any):any{
    return p1+p2;
}

console.log(add(1,2));
console.log(add("Hey-","What's up"));
