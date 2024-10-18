/* comparision operator compares two value and gives back a boolean result
1.== check just the value but not the data type
2.=== checks both value and data type 
3.!== not equal to that value or datatype
4.>= greater than or equal to that data type
5.<= less than or equal to that data type
*/

let compareNum1=10;
let compareNum2=10;
console.log(compareNum1=="10");//will just check the inner value
console.log("10===10 ->"+ (compareNum1===compareNum2));
console.log("10<=9->"+(compareNum1<=9));
console.log("10>=9->"+(compareNum1>=9));
console.log("10!='10'->"+(compareNum1!="10"));//will just check the value 
console.log("10!='10'->"+(compareNum1!=="10"));

