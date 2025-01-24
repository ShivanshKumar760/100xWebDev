//function:
//while using ts we need to sepecify the datatype the parameter holds and 
//if our function returns something we need to specify the data type  of 
//the return value:

/**
 * 
 * @param p1 number
 * @param p2 number
 * @returns 
 
*/

/*the syntax is : function function_name(parameter:parameter_DataType):returnType_data 
                {
    //code 
}
*/
function add(p1:number,p2:number):number{
    return p1+p2
}


let num1:number=7;
let num2:number=3;
console.log(add(num1,num2));



//another example would be basically passing data structure as the parameter:


//if the function is not returning anything we can give it type of void
function traverse(items:number[]):void{
    items.forEach((item:number,i:number)=>{
        console.log(`At index:${i} the value is ${item} and type is:${typeof item}`);
    });
};

traverse([3,4,5]);

//return type inference://will automatically infer the typem which will be returned by
//the function
function formatGreeting(name:string,greeting:string){
    return `${greeting} , ${name}`
}


let inferedResult=formatGreeting("Shivansh","Hello");

console.log(inferedResult,"type is",typeof inferedResult);