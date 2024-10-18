//There are some operator in js which can be used to perform mathematical operations like
/*
+ addition 
- subtraction 
* multiplication
/ division
% modulos remainder
** power 
*/
let num1 = 10;
let num2 = 2;
let result1=num1/num2;
console.log(result1);
let rem=num1%3;
console.log(rem);


//Opeator Precedence:Bracket Exponential Divide Multiply Add Subtract(BEDMAS):
let pi=3.14;
let radiusMinusOne=2;
let area=pi*(radiusMinusOne+1)**2;
console.log(area);

//increment and decrement operator :
let counter1=10;
console.log(counter1++);//post increment operator meaning after reading this line counter1++ the counter will get executed
console.log(counter1);

let counter2=8;
counter2--;
console.log(counter2);


//assignment operator =,+=,-=,*=,/=.**=.%= :
let num3=10;
num3+=1;//add 1 to num3 variable and assign the new value to num3
console.log(num3);

num3-=3;
console.log(num3);

num3*=4;
console.log(num3);