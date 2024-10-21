/*
let see how logical operator works in any programming language logical operator are based on logical gate
1.and &&

Opr1   Opr2   (Opr1 and Opr2)
t        f          f
f        t          f
t        t          t
f        f          f



2.OR(||)

Opr1   Opr2   (Opr1 or Opr2)
t        f          t
f        t          t
t        t          t
f        f          f

3.Not(!)
!true-false
!false-true
*/

let opr1=true;
let opr2=false;
console.log(opr1 && opr2);
console.log(opr1 || opr2);
console.log(!opr1);
console.log(!opr2);