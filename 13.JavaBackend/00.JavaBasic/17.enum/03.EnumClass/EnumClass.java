enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}

enum Laptop{
//we can attach extra peice of data with enum
    DELL("Windows", 500),//so when we say DELL("Windows",500) it will call the constructor Laptop(String os,int p) where DELL is like object of Laptop enum
    MACBOOK("MacOS", 1500),
    LENOVO("Windows", 600),
    HP("Windows", 550),
    XIAOMI;


    private String os;
    public int price;
    private Laptop(){//why default constructor?? cause we have one enum constant XIAOMI which does not provide any argument
    }
    //constructor
    Laptop(String os,int p){//so how this constructor get called?? it get called when we define the enum constants like DELL("Windows")
    //that is the moment when the constructor is invoked with the provided argument
    //enum constructors are always private
    //you cannot create enum instances using new keyword
    //ex: Laptop laptop = new Laptop("Windows"); // This will cause a compilation error
    //ex: Laptop laptop = Laptop.DELL; // This is correct way to get enum instance
    //it will create a reference to the DELL enum constant
    //and envoke the constructor with "Windows" argument cause we defined DELL("Windows")
    //and when we Laptop lap=Laptop.dell -->this mounts the reference of DELL enum constant to lap variable
    //so now lap variable can access all the methods and fields of DELL enum constant kind of like object reference
        this.os = os;
        this.price = p;
    }

    public String getOs(){
        return os;
    }
}
public class EnumClass {
    public static void main(String[] args) {
        
        //enum is itself a class with fixed set of constants which cannot be extended or modified
        //means it can have its own constructors, methods, and fields
        Day today = Day.THURSDAY;

        // Demonstrating that enum is a class
        System.out.println("Class of today: " + today.getClass()); // Outputs: class Day
        System.out.println("Is today an instance of Enum? " + (today instanceof Enum)); // Outputs: true
        System.out.println("Superclass of Day: " + today.getClass().getSuperclass()); // Outputs: class java.lang.Enum

        // Using the Laptop enum with additional data
        Laptop myLaptop = Laptop.MACBOOK;
        System.out.println("My laptop is: " + myLaptop);
        System.out.println("Operating System: " + myLaptop.getOs()); // Outputs: MacOS
        System.out.println("Price: $" + myLaptop.price); // Outputs: 1500
        myLaptop.price=1400; // Modifying the price field
        System.out.println("Updated Price: $" + myLaptop.price); // Outputs: 1400

    }   
}
