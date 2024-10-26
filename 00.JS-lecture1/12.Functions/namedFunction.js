//named function are the normal function which are named that is they are given a specific name by user which follows the 
//identifier rule

//syntax to declare a function is :
/*
    function function_name(p1,p2,........,pN)
    {
        //code block
    }
*/

function greet(name="Shivansh")//default parameter which will be used when user or programmer forgets to pass the parameter in 
//function call
{
    console.log(name);
    return "Hello "+name;
}

greet("david");
console.log(greet("alex"));