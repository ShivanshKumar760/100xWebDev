let obj={
   
    value:"maz",
    status:[this.value ? this.value:"pending"],
    resolve:function(val)//resolve function
    {
        let valueTaker=val;//will take the value entered or data from user
        return valueTaker;//return the value
    },
    then:function(cb,val)//will take a callback to process data ,and fata
    {
        // let valueTaker=this.value;
        let result=this.resolve;
        let instanceValue=val
        cb(result,instanceValue);
    },
    test:function(cb)
    {
        cb;
    },
    then2:function(cb,val)
    {
        cb(this.resolve(this.value||val))//optimise of .then() function
    },
    then3:function(cb,val)
    {
        let result=this.resolve;
        let instanceValue=val
        cb(result,instanceValue||this.value);
    }
    
}

function logger(cb,instanceVal)
{
    
    let r=cb(instanceVal);
    console.log(r);
}
let object=obj;
console.log(object)
obj.then(logger,"a");
obj.test(console.log("hello"));
obj.then2(console.log,"david");
obj.then3(logger,"machie");
obj.then3(logger);