//remember we talked about array refrence that is when we assign a variable a array instead of making a new copy it points to the original array
/*
//lets understand the concept of refrencing or pointer 

let num1=9;
let num2=num1;
num2=20;
console.log("num1 is:"+num1);
console.log("num2 is:"+num2)//here num2 is holding value of num1 and not the address of num1 that is why when 
//we changed the value of num2 value of num1 didnt change because number or any
//primitive data type are well define in nature and have fixed size but 

//but since array is  a object they are dynamically allocate in js or java using new keyword inside heap memory and
//since we cant access array directly from heap memory when we say
//let arr=New Array(1,2,3);//it creates a pointer or refrence which points to that heap memory and stored inside arr variable

let arrayObject=new Array(7);
arrayObject[0]=1;
arrayObject[1]="2";
arrayObject[2]="shivansh";
arrayObject[3]=true;
arrayObject[4] =false;
arrayObject[5]= Symbol("a");
arrayObject[6]=3.14;

arrayObj2=arrayObject;//this is similar to c++ wher  int arr[3]={1,2,3}; int *ptrArray=arr; cause arrayObject referes to heap memory
//and arrayObje2 is also pointing to same so changing arrayObj2 will also change arrayObject data

cpp
 int arr[3]={1,2,3};
int *ptrArray=arr;
cout<<ptrArray[0];

process.stdout.write("Before changing value\n");
console.log(arrayObject);
console.log(arrayObj2);
arrayObj2[2]=45;

ptrArray[1]=6;//this will change in original array also
process.stdout.write("After  changing value\n");
console.log(arrayObject);
console.log(arrayObj2);

*/

//well we can solve the problem of making a new copy using slice method



/*
The next method we will cover is slice(). Rather than modifying an array, slice() copies or extracts a given number of elements to a 
new array, leaving the array it is called upon untouched. slice() takes only 2 parameters — the first is the index at which to begin extraction, 
and the second is the index at which to stop extraction (extraction will occur up to, but not including the element at this index). Consider this:

let weatherConditions = ['rain', 'snow', 'sleet', 'hail', 'clear'];

let todaysWeather = weatherConditions.slice(1, 3);
todaysWeather would have the value ['snow', 'sleet'], while weatherConditions would still have ['rain', 'snow', 'sleet', 'hail', 'clear'].

In effect, we have created a new array by extracting elements from an existing array.*/


let weatherConditions = ['rain', 'snow', 'sleet', 'hail', 'clear'];

let todaysWeather = weatherConditions.slice(0, 5);
console.log(todaysWeather);