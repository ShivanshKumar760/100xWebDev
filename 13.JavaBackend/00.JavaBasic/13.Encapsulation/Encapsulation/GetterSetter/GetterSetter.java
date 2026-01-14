class Employee {
    // Private variables (Encapsulation)
    private String name;
    private double salary;
    private int id;
    
    // Constructor
    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }
    
    // Public getter methods
    public String getName() { return name; }
    public double getSalary() { return salary; }
    public int getId() { return id; }
    
    // Public setter methods with validation
    public void setName(String name) {
        if (name != null && name.length() > 0) {
            this.name = name;
        }
        else{
            System.out.println("Name cannot be empty");
        }
    }
    
    public void setSalary(double salary) {
        if (salary > 0) {
            this.salary = salary;
        } else {
            System.out.println("Salary must be positive");
        }
    }
    
    // Display method
    public void displayInfo() {
        System.out.println("ID: " + id + ", Name: " + name + ", Salary: " + salary);
    }
}
public class GetterSetter {
    public static void main(String[] args) {
        //let's create an object of Employee class
        Employee emp = new Employee("Alice", 101);
        emp.setSalary(50000); // setting salary using setter
        emp.displayInfo(); // displaying employee info
        emp.setSalary(-100); // trying to set invalid salary
        emp.setName(""); // trying to set invalid name
        emp.setName("Bob"); // setting valid name
        emp.displayInfo(); // displaying updated employee info
        
    }
}
