let obj={
   
    value:"maz",
    status:[this.value ? this.value:"pending"],
    resolve:function(val)
    {
        let valueTaker=val;
        return valueTaker;
    },
    then:function(cb,val)
    {
        // let valueTaker=this.value;
        let result=this.resolve;
        let instanceValue=val
        cb(result,instanceValue); //callback how to pass in high order totally //depends on high order function
        //here cb is a callback for then () function but it will act
        //as high order for other function passed inside then()
    },
    test:function(cb)
    {
        cb;
    },
    then2:function(cb,val)
    {
        cb(this.resolve(this.value||val))
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