//suppose we are  printing a pair number that is a series of pair number that is :
/*
1  1
1  2
1  3

2  1
2  2
2  3

3  1
3  2
3  3

and we want to skip 2 2 pair and then continue the iteration from 2 3 
for use case like this we use (continue key word)
*/

for(let outerNum=1;outerNum<=3;outerNum++)
{
    for(let innerNum=1;innerNum<=3;innerNum++)
    {
        if(outerNum===2 && innerNum ===2)
        {
            continue;
        }
        else{
            process.stdout.write(outerNum+" "+innerNum);
        }
        console.log();
    }
}

//now suppose we need to print the same number pair series but we have to stop at 2 2 for that we use break
console.log();
console.log();
console.log();
for(let outerNum2=1;outerNum2<=3;outerNum2++)
{
    for(let innerNum2=1;innerNum2<=3;innerNum2++)
    {
        if(outerNum2===2 && innerNum2 ===2)
        {
            break;//but this will break the inner loop only and then the contol will shift to outer loop
            //and the innerNum1 will start from 3 skipping 2 2 and 2 3 

            //if we need to break the outer loop in order for us to stop program we can label it 
        }
        else{
            process.stdout.write(outerNum2+" "+innerNum2);
        }
        console.log();
    }
}


console.log();
console.log();
console.log();
outerLoop:
for(let outerNum3=1;outerNum3<=3;outerNum3++)
{
    innerLoop:
    for(let innerNum3=1;innerNum3<=3;innerNum3++)
    {
        if(outerNum3===2 && innerNum3 ===2)
        {
            break outerLoop;//but this will break the inner loop only and then the contol will shift to outer loop
            //and the innerNum1 will start from 3 skipping 2 2 and 2 3 

            //if we need to break the outer loop in order for us to stop program we can label it 
        }
        else{
            process.stdout.write(outerNum3+" "+innerNum3);
        }
        console.log();
    }
}