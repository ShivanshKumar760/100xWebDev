/*
*****-row 1--space in each row is 2*row-:0 space in row1
  ****-row 2--2 space in row 2
    ***-row 3--4 space in row 3
      **-row 4--6 space in row 4
        *-row 5--8 space in row 5
*/

for(let i=1;i<=5;i++)
{
    let spaceString="";
    for(let space=1;space<=2*i-2;space++)
    {
        spaceString+=" "
    }
    // console.log(spaceString);
    process.stdout.write(spaceString);

    let starString="";
    for(let star=5;star>=i;star--)
    {
        starString+="*";
    }
    // console.log(starString);
    process.stdout.write(starString+"\n");
}

/*
another way to do the samething would be to iterate row backward
*****-row 5--space in each row is 2*(totalRow-currentRow) space in row1
  ****-row 4--2 space in row 2-2*(5-4)-2 space
    ***-row 3--4 space in row 3-2*(5-3) 4 space
      **-row 2--6 space in row 4-2*(5-2) 6 space
        *-row 1--8 space in row 5-2*(5-1) 8 space
*/

let totalRow=5;
for(let i=5;i>=1;i--)
{
    let spaceString="";
    for(let space=1;space<=2*(totalRow-i);space++)
    {
        spaceString+=" "
    }
    // console.log(spaceString);
    process.stdout.write(spaceString);

    let starString="";
    for(let star=1;star<=i;star++)
    {
        starString+="*";
    }
    // console.log(starString);
    process.stdout.write(starString+"\n");
}