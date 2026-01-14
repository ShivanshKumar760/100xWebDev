// Parent class (Superclass)
class Animal {
    protected String name;
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class (Subclass)
class Dog extends Animal {  // Dog IS-A Animal
    
    public Dog(String name) {
        this.name = name;  // Inherited from Animal
    }
    
    // New method specific to Dog
    public void bark() {
        System.out.println(name + " is barking");
    }
    
    // Override parent method
    @Override
    public void eat() {
        System.out.println(name + " is eating dog food");
    }
}

// Another subclass
class Cat extends Animal {  // Cat IS-A Animal
    
    public Cat(String name) {
        this.name = name;
    }
    
    // New method specific to Cat
    public void meow() {
        System.out.println(name + " is meowing");
    }
}

public class SubClassDemo {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy");
        dog.eat();   // Inherited method
        dog.sleep(); // Inherited method
        dog.bark();  // Dog-specific method
        
        System.out.println();
        
        Cat cat = new Cat("Whiskers");
        cat.eat();   // Inherited method
        cat.sleep(); // Inherited method
        cat.meow();  // Cat-specific method
    }
}