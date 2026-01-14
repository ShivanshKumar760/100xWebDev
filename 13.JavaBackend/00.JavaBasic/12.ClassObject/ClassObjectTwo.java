class Hello{
    //This is a class its a user defined data type : so a datatype like string or int 
    //have some property like the string have length property and int have max value property
    //and they have some function associated with them like string have toUpperCase() function and int have compareTo() function
    //similarly a class can have some property and some function associated with it
    //here Class Hello has a property greeting and a function sayHello()
    //associated with it now the speciality of user created data type is that we can create multiple objects of that class
    //and each object property are some kind of jave primitive or non-primitive data type
    //which we can access
    String greeting;
    /**
     * parameterized constructor are used to initialize the property of class at the time of object creation
     */
    Hello(String greeting){//default value is Hello World if no value is passed
        //parameterized constructor
        //this is a keyword that refers to the current object
        //it is used to differentiate between instance variable and parameter variable when they have same name
        //since in heap there are multiple object of class Hello so to differentiate between them we use this keyword
        //this points to that perticular object in which it is used and refer to the memory location of that object
        this.greeting = greeting;
    }
    public void sayHello(){
        System.out.println(greeting);
    }
}
public class ClassObjectTwo {
        public static void main(String[] args){
        //Now here to access the property and function of class Hello we need to create an object of that class
        //What is an object?
        //a object is an instance of a class  and it is created using new keyword cause it allocates memory to that object
        //in the heap memory ,now instance mean there can be multiple instance and each instance have its own copy of property
        //and function isolated from other instance

        //syntax to create an object
        //ClassName objectName = new ClassName();
        //just like dataType variableName = value;
        Hello obj1 = new Hello("");
        Hello obj2 = new Hello("");
        //now obj1 and obj2 are two different object of class Hello
        obj1.greeting = "Hello World"; // assigning value to property of obj1
        obj2.greeting = "Hello Java"; // assigning value to property of obj2
        obj1.sayHello(); // calling function of obj1
        obj2.sayHello(); // calling function of obj2

        Hello obj3= new Hello("Hello Programming"); //object created using parameterized constructor
        obj3.sayHello(); // calling function of obj3



    }
}
