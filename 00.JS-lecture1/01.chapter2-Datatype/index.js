let number1=400;
let number2=3.14;
console.log(number1+"->"+typeof number1);
console.log(number2+"->"+typeof number2);

let firstName="Shiv";
console.log(firstName+"->"+typeof firstName);
let logicalValue=true;
console.log(logicalValue+"->"+typeof logicalValue);

let nillValue=null;//null is a object so while printing its type it will give object but a null is a false value and using type conversion 
//we  can check it 
console.log(nillValue+"->"+typeof nillValue)
//type conversion of null
console.log(nillValue+" type conversion in boolean is "+Boolean(nillValue));

//Symbol
let symbol1=Symbol("Hey");
let symbol2=Symbol("Hey");
console.log(symbol1===symbol2);//it will give false cause each symbol is unique
/*
we can even provide it with a numbe or boolean value :
let symbol1=Symbol(1);
let symbol2=Symbol(1);r */

let arrayStorage=[];//this is how we declare array in js let/var/const array_name=[]
console.log(arrayStorage);
console.log(typeof arrayStorage);//array is a special object diffrent than conventional object 


//we can even overwrite a number value with string value unlike strictly type programming language like c++ or java 

let score=95;
console.log(score+"->"+typeof score);
score="95";
console.log(score+"->"+typeof score);

//type conversion
let testValue="80";
console.log(testValue+":80 while declaring testValue was enclosed in qoute" + "->"+typeof testValue)
testValue=Number(testValue)
console.log(testValue+"->"+typeof testValue)
testValue=Boolean(testValue);
console.log(testValue+"->"+typeof testValue)
let testValue_string2Bool="test";
testValue_string2Bool=Boolean(testValue_string2Bool)
console.log(testValue_string2Bool+"->"+typeof testValue_string2Bool)
let test_Number2String=99;
console.log(String(test_Number2String)+"->"+typeof String(test_Number2String))