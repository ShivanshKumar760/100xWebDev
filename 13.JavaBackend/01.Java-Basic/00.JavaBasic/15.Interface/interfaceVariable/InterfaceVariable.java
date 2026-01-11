//interface dont have there own memory in the heap and they are implemented by the classes so the variables defined in the interface are by default static and final 
interface Demo{
    // By default, variables in an interface are public, static, and final
    int VALUE = 10; // This is eq   uivalent to public static final int VALUE = 10;
    
    // void Demo();//This method has a constructor name and interface cannot have a constructor
    void display();
}

class DemoImpl implements Demo{
    @Override
    public void display() {
        System.out.println("Value: " + Demo.VALUE);
    }
   
}
public class InterfaceVariable {
    public static void main(String[] args) {
        DemoImpl demo = new DemoImpl();
        demo.display(); // Output: Value: 10

        Demo demo2=new DemoImpl();//here in the demo2 we are using interface reference variable to refer the object of the implementing class
        //this is called as dynamic method dispatching which is used to achieve runtime polymorphism in java
        //and we will discuss this in detail in the later modules but for now just understand that we can use interface reference variable to refer the object of the implementing class
        //which basic in laymen language means we can use interface variable to refer the object of the class which implements that interface
        //its knows as upcasting also because we are moving from the child class to the parent interface
        //Upcasting is the process of converting a subclass object to a superclass reference. This is always implicitly allowed by Java because a subclass "is-a" type of its superclass.  
        demo2.display();

        //And since property in interface are static we can access them using the interface name also
        System.out.println("Accessing VALUE using interface name: " + Demo.VALUE);
    }
}
