interface DemoInterface1 {
    void methodDemoInterface1();
}
interface DemoInterface2 {
    void methodDemoInterface2();
}



class DemoClass implements DemoInterface1, DemoInterface2 {//a class can implement multiple interfaces by separating them with a comma
    //and thats how u achieve multiple inheritance in java using interfaces cause we cant achieve multiple inheritance using classes in java
    //we can only extend one class at a time but we can implement multiple interfaces at a time
    //this is one of the main advantages of using interfaces in java
    @Override
    public void methodDemoInterface1() {
        System.out.println("Implementation of method from DemoInterface1");
    }

    @Override
    public void methodDemoInterface2() {
        System.out.println("Implementation of method from DemoInterface2");
    }
}

//But when we implement interface->interface we can extend multiple interfaces at a time
 interface InnerMultipleInterface extends DemoInterface1,DemoInterface2{
    //here InnerMultipleInterface is extending both DemoInterface1 and DemoInterface2
    //so any class which implements InnerMultipleInterface has to provide implementation for both the methods of DemoInterface1 and DemoInterface2

    //lets create a method
    void innerMethod();
    
}

class InnerMultipleInterfaceImpl implements InnerMultipleInterface{

    @Override
    public void methodDemoInterface1() {
        System.out.println("Implementation of method from DemoInterface1 in InnerMultipleInterfaceImpl");
    }

    @Override
    public void methodDemoInterface2() {
        System.out.println("Implementation of method from DemoInterface2 in InnerMultipleInterfaceImpl");
    }

    @Override
    public void innerMethod() {
        System.out.println("Implementation of innerMethod from InnerMultipleInterface in InnerMultipleInterfaceImpl");
    }
    
}
public class MultipleInterface {
    public static void main(String[] args) {
        DemoClass demo = new DemoClass();
        demo.methodDemoInterface1();
        demo.methodDemoInterface2();

        InnerMultipleInterfaceImpl innerDemo = new InnerMultipleInterfaceImpl();
        innerDemo.methodDemoInterface1();
        innerDemo.methodDemoInterface2();
        innerDemo.innerMethod();

        //using upcasting
        DemoInterface1 demo1 = new InnerMultipleInterfaceImpl();
        demo1.methodDemoInterface1();
        //demo1.innerMethod(); //this will give error because demo1 is reference of DemoInterface1 and it doesnt have access to innerMethod()
        //so here upcasting is happening from InnerMultipleInterfaceImpl to DemoInterface1 but DemoInterface1 doesnt have access to innerMethod()
    }   
}


//class-class : extends
//class-interface : implements
//interface-interface : extends