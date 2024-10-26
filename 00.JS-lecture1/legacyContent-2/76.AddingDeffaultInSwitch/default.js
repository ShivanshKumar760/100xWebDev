function switchOfStuff(val) {
  let answer = "";
  // Only change code below this line
  switch(val)
  {
    case 'a':answer="apple";break;
    case 'b':answer="bird";break;
    case 'c':answer="car";break;
    default:
      answer="stuff";
      break;
  }

  // Only change code above this line
  return answer;
}

switchOfStuff(1);