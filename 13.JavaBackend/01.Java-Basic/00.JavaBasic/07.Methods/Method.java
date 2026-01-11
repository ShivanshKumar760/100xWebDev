public class Method {
    //Method are function associated with class 
    //Now there are two types of method 
    //1. Static method
    //2. Instance method

    //Static method are part of class and can be called without creating object of class
    //that is we can call static method directly using class name or without class name
    //when can we call them without class name ? is we are calling them from same class
    static void staticMethod(){
        System.out.println("This is static method");
    }

    //Instance method are part of object and can be called only by creating object of class
    void instanceMethod(){
        System.out.println("This is instance method");
    }

    public static void main(String[] args) {
        //calling static method
        staticMethod(); // calling without class name because we are calling from same class
        Method.staticMethod(); // calling with class name

        //calling instance method
        Method obj = new Method(); // creating object of class
        obj.instanceMethod(); // calling instance method using object
    }
}
