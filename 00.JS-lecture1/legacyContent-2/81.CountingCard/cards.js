let count = 0;

function cc(card) {
  // Only change code below this line
  // if(card>=2 && card<=6)
  // {
  //   count++;
  // }
  // else if(card>=7 && card<=9)
  // {
  //   count=count+0;
  // }
  // else if(card===10 || card ==='J' || card ==='Q'|| card ==='K'||card==='A')
  // {
  //   count--;
  // }
  // if(count>0)
  // {
  //   //String template is like format string in python
  //   return `${count} Bet`;
  // }
  // else if(count<=0)
  // {
  //   return `${count} Hold`
  // }
  switch(card)
  {
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      count++;
      break;
    case 10:
    case 'J':
    case 'Q':
    case 'K':
    case 'A':
      count--;
      break;
  }
  let status="Hold";
  if(count>0)
  {
    status="Bet";
  }
  return count+" "+status;
  return "Change Me";
  // Only change code above this line
}

cc(2); cc(3); cc(7); cc('K'); cc('A');