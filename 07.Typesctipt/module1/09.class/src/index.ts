class Person{
    name:string;//so in typescript we can give class property data type unlike js 
    //were we cant give class properties data
    constructor(name:string){
        this.name=name;
    }
    greet()
    {
        console.log(`Hello , ${this.name}`);
    }
}


const person1=new Person("Shivansh");
person1.greet();

// Now in ts we can give class ,property and a function access modifier like 
//public ,private and protected

class Employee{
    name:string;
    private empId:number;//this can only be accessed inside of this class
    //outside of class we cannot manipulate or use this property using object
    count=Math.random()*10;
    constructor(name:string){
        this.name=name;
        this.empId=this.count++;
    }
    greet()
    {
        console.log(`Hello , ${this.name}  and empId:${this.empId}`);
    }

}

const emp1=new Employee("Shivansh");

const emp2=new Employee("Alex");
emp1.greet();
emp2.greet();



class Student{
    name:string;
    protected rollNumber:number;//this can only be accessed inside of this class
    //and from the child class which extends to this as the base   class 
    // we cannot manipulate or use this property using object
    count=Math.random()*10;
    constructor(name:string){
        this.name=name;
        this.rollNumber=this.count;
    }
    greet()
    {
        console.log(`Hello , ${this.name}  and roll call${this.rollNumber}`);
    }

}

class RollCall extends Student{//this will extend all the property and function of 
    //the original parent class even the constructor
    sayRollCall(){
        console.log(this.rollNumber)
    }
}


const stu1_rollCall=new RollCall("Max");
stu1_rollCall.sayRollCall();