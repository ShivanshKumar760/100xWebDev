//Note on annotation:
// Annotations are a form of metadata that provide data 
//about a program but are not part of the program itself.
// They have no direct effect on the operation of the code they annotate.
// Commonly used for:
// 1. Information for the compiler
// 2. Compile-time and deployment-time processing
// 3. Runtime processing
//In Java, annotations are defined using the "@" symbol followed by the annotation name.
// Here are some commonly used built-in annotations in Java:
// 1. @Override: Indicates that a method is intended to override a method in a superclass.
// 2. @Deprecated: Marks a method, class, or field as deprecated, indicating that it should no longer be used.
// 3. @SuppressWarnings: Instructs the compiler to suppress specific warnings for the annotated element.
// Here is a simple example demonstrating the use of annotations in Java:
//In Java-Spring framework, annotations are extensively used to simplify configuration and
//reduce boilerplate code. Some commonly used Spring annotations include:
//like @Controller, @Service, @Repository, @Autowired, @Component, @RequestMapping, etc.
//These annotations help in defining beans, managing dependencies, and mapping web requests to handler methods.
//annotation like :@GetMapping, @PostMapping, @PutMapping, @DeleteMapping are used to map HTTP GET, POST, PUT, DELETE requests respectively to specific handler methods in a controller class.
//but now the question is annotation dosent effect the code execution then how does @GetMapping work like how does server know which method to call when a GET request is made to a specific URL?
////The answer lies in the underlying framework (like Spring) that processes these annotations at runtime.
/// When a Spring application starts up, it scans the classes for these annotations and builds a mapping of URLs to handler methods based on the annotations present.
/// So, when a GET request is made to a specific URL, the framework looks up the mapping it created during startup and invokes the corresponding method to handle the request.
/// This process is part of the framework's internal workings and is not directly related to the Java language itself.

@Deprecated
class Base{
    @Deprecated
    void show(){
        System.out.println("Base show method");
    }
}

class Derived extends Base{
    @Override
    void show(){
        System.out.println("Derived show method");
    }
}

//another example would be :
class WarningExample{
    @SuppressWarnings("unchecked")
    void unsafeMethod(){
        java.util.List list = new java.util.ArrayList();
        list.add("Test");
        System.out.println("List: " + list);
        //one by one print:
        for(Object obj : list){//why here we took Object  obj because list is of type List without generics so it can hold any type of object
            //so why didnt we directly took String obj because it may cause ClassCastException at runtime if the list contains non-string objects
            System.out.println((String)obj);
        }

    }
}
public class AnnotationIntro{
    public static void main(String[] args){
        
        //base:
        Base b = new Base();
        b.show(); // This will call the deprecated method in Base class
        Derived obj = new Derived();
        obj.show(); // This will call the overridden method in Derived class

        WarningExample we = new WarningExample();
        we.unsafeMethod(); // This will not show unchecked warning
    }
}