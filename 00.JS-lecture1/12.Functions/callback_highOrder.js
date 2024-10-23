//High Order function and call backs both are inter related :

//Higher-order functions are functions that take other functions as arguments or return functions as their result.

//A callback function is a function passed into another function as an argument, which can then be called within that function.

//High-order works as inputTaker and callback is input 

function inputTaker(p1,p2,func)
{
    return func(p1,p2);
}
function add(n1,n2)//this function will be given as input so we will call it from inputTaker() and once called it will give back ans
{
    return n1+n2;
}
// function trick()
// {
//     console.log("Hello World")
// }
let result=inputTaker(5,6,add);//here basically we have passed a refrence to that function add via its name 
console.log(result);
// console.log(inputTaker(1,2,trick()));//wont work
if(true)
{
    try{let result2=inputTaker(5,6,add(5,6));//this will give error cause when called inputTaker--will call this 
    //func(p1,p2): add(5,6)(5,6) where func holds add(5,6)
    
    //thats why we pass refrence to the function via name inputTaker(5,6,add) so here func(p1,p2):func-->add p1:5 and p2:6
    
    
    console.log(result2);}


    catch(error){
        console.log("invalid semantics/syntax maybe passed immediate invocation of function,instead add refrence");
    }
}
// let result2=inputTaker(5,6,add(5,6));//this will give error cause when called inputTaker--will call this 
// //func(p1,p2): add(5,6)(5,6) where func holds add(5,6)

// //thats why we pass refrence to the function via name inputTaker(5,6,add) so here func(p1,p2):func-->add p1:5 and p2:6


// console.log(result2);


/*
few example of high order function which is pre built into js interpreter or runtime that are:
1.map()
2.filter()
3.reduce()

each takes a function as input and execute it on array element
*/

let arr=[1,2,3];
let resultArray=arr.map((Element)=>{Element=Element*2;return Element+2;});
console.log(resultArray);

/*
let resultArray=arr.map((Element)=>{Element=Element*2;return Element+2;});--here u may say hmm we just discussed above that when
we pass a call back we should invoke it directly but here
let resultArray=arr.map((Element)=>{
    Element=Element*2;return Element+2;});//forget about invoking it immediately we have defined it inside a high order function
    //will it not get executed immdeately ans is no cause we have defined a anonymous arrow function
    //inside our high order function map() but we haven't call it in order to call a function suppose my function name is 
    //sayHello we need to add this open and closing parenthesis () untill we don't do that it wont get invoke
    //similarly when we play with a anonymous function unitl we dont attach these () using iife(Immediately Invoked Function Expressions)
    //they wont get execute insted there function defination will go into map() function define in array class
*/

//lets try to re-create map function to understand underlying logic

function mapArray2Func(arrayPara,func)
{
    let createNew=[];
    for(let i=0;i<arrayPara.length;i++)
    {
        let valueCatcher=arrayPara[i];
        createNew.push(func(valueCatcher));//
    }
    console.log(createNew);
}

mapArray2Func([1,2,3],(elem)=>{return elem*2});


// function mapArray2Func(arrayPara,func)//func:(elem)=>{return elem*2}
// {
//     let createNew=[];
//     for(let i=0;i<arrayPara.length;i++)
//     {
//         let valueCatcher=arrayPara[i];
//         createNew.push(func(valueCatcher));//func:(elem)=>{return elem*2} elem:valueCatcher

            //createNew.push(((elem)=>{return elem*2})(valueCather));
//     }
//     console.log(createNew);
// }


function mapArray2FuncDemo(arrayPara)
{
    let createNew=[];
    for(let i=0;i<arrayPara.length;i++)
    {
        let valueCatcher=arrayPara[i];
        // createNew.push(((elem)=>{console.log(elem*2)})(valueCatcher));
        createNew.push(((elem)=>{return (elem*2)})(valueCatcher));
    }
    console.log(createNew);
}

mapArray2FuncDemo([1,2,3]);



const numbers = [1, 2, 3, 4, 5];


// let check=num => num % 2 === 0;
// console.log(check(2));  this will  give true or false
const evenNumbers1 = numbers.filter(num => num % 2 === 0);//this will give true or false and if the number for which it returns true
//will get pushed into new array

//instead of abpove arrow function we can even do somthing like this

function findEven(num)
{
    if(num%2==0)
    {
        return true;
    }
    // else{
    //     return false;
    // }
}
let numbers2=[2,3,4,5,6,7,8];
const evenNumbers2 = numbers2.filter(findEven);
console.log(evenNumbers1); // [2, 4]
console.log(evenNumbers2); 

function  arrayFilter(arrParameter,func)
{
    let createNew=[];
    for(let item of arrParameter)
    {
        let check=function(item){
            if(func(item))
            {
                // console.log(item);
                createNew.push(item);
               
            }
            else{
                // console.log(item);
                return false;
            }
        }
        //(function(item){
        //     if(func(item))
        //     {
        //         createNew.push(item);
        //     }
        // })(item));
        check(item);
    }
    console.log(createNew);
}

arrayFilter([2,3,4,5,6,7,8,10,11,12],findEven);


// The reduce() method executes a reducer function on each element of the array, resulting in a single output value.

const numberReducer = [1, 2, 3];

const sum = numberReducer.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 15

