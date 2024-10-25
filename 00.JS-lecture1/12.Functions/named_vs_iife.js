function nameLogger(name)
{
    console.log(name);
}

nameLogger("Shivansh");

(
    (name)=>{console.log(name);}
)("Shivansh Kumar");


//both are equal it's just that for one we have refrence to call it anywhere 
//and another cannot ne called anywhere unitl we store it in a varaiable 
//like :

const ref_Anonymous=(name)=>{console.log(name)};
ref_Anonymous("Shivansh Kumaaar");