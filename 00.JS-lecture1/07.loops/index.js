//print number till 10 using for loop:

for(let i=0;i<=10;i++)
{
    console.log("i="+i);
}

//another way to use for loop is breakdown its component:

let iteratorOutside=1;
for(;iteratorOutside<=5;)
{
    console.log(iteratorOutside);
    iteratorOutside++;
}

//while loop:
//find  the sum of first n natural number using while loop:

let firstN=0;
let counter=1;
let n=10;
while(counter<=n)
{
    firstN=firstN+counter;
    counter++;
}
console.log(firstN);