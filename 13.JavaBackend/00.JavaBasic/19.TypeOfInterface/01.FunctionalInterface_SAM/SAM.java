@FunctionalInterface
// SAM  a interface with just one function 
interface Demo{
  void show();
}

class Test implements Demo{
  public void show(){
    System.out.println("Hello from show method");
  }
}
public class SAM{
  public static void main(String[] args) {
    // Interface reference to the object of the class implementing the interface
    Demo obj = new Test();
    obj.show();

    //Class reference to the object of the class implementing the interface
    Test obj2 = new Test();
    obj2.show();


    //annonymous class implementing the interface
    Demo obj3 = new Demo(){
      public void show(){
        System.out.println("Hello from annonymous class");
      }
    };
    obj3.show();


    //But the real use  case of functional interface is to use lambda expression
    //and we can use l ambda expression only with functional interface

    // Demo obj4 = ()-> 
    // {
    //   System.out.println("Hello from lambda expression")
    // };

    //but since we have only one statement:
    Demo obj4 = ()-> System.out.println("Hello from lambda expression");
    //lambda expression implementing the show method
    //how it works:like we are not calling show via name but we are providing the implementation of show method
    //but how does the compiler know that this implementation is for show method
    //because the interface Demo has only one method and it's known by compiler
    obj4.show();
  }
}
