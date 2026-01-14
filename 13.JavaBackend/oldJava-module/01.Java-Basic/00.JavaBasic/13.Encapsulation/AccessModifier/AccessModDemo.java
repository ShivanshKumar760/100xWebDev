class Student {
    public String name;        // Anyone can access
    private int age;           // Only Student class can access
    protected String school;   // Same package + subclasses
    String city;              // Same package only (default)
    
    public void showInfo() {   // Anyone can call this method
        System.out.println("Name: " + name);
    }
    
    private void secretMethod() {  // Only this class can call
        System.out.println("This is private");
    }
}

class Rahul extends Student{
    
    //this.age = 21;      // Not allowed (private)
    Rahul(){
        this.name = "Rahul"; // Allowed (public)
        this.city = "Delhi"; // Allowed (default, same package)
        this.school = "XYZ School"; // Allowed (protected, subclass)
    }
    //access public member of superclass
    public void accessPublic() {
        System.out.println("Name: " + this.name); // Allowed (public)
    }
    //accessing default member of superclass
    public void accessDefault() {
        System.out.println("City: " + this.city); // Allowed (same package)
    }
    //accessing protected member of superclass
    public void accessProtected() {
        System.out.println("School: " + this.school); // Allowed (subclass)
    }
}
public class AccessModDemo {
    public static void main(String[] args) {
        Student student = new Student();
        student.name = "John";          // Allowed
        // student.age = 20;            // Not allowed (private)
        student.school = "ABC High";    // Allowed (same package)
        student.city = "New York";      // Allowed (same package)
        student.showInfo();             // Allowed
        // student.secretMethod();      // Not allowed (private)
        Rahul rahul = new Rahul();
        rahul.accessPublic();           // Allowed
        rahul.accessDefault();          // Allowed
        rahul.accessProtected();        // Allowed
    }
}
