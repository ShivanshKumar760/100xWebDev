// Interface definition
interface Animal {
    void makeSound();    // implicitly public abstract
    void move();         // implicitly public abstract
    
    String TYPE = "Living Being";  // implicitly public static final
}

// Implementation
class Dog implements Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
    
    @Override
    public void move() {
        System.out.println("Running on four legs");
    }
}

class Bird implements Animal {
    @Override
    public void makeSound() {
        System.out.println("Tweet!");
    }
    
    @Override
    public void move() {
        System.out.println("Flying in the sky");
    }
}
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

// A class can implement multiple interfaces
class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck is swimming");
    }
}
public class InterfaceExample {
    public static void main(String[] args) {
        // Create objects
        Dog dog = new Dog();
        Bird bird = new Bird();
        Duck duck = new Duck();
        
        // Use implemented methods
        dog.makeSound();    // Woof!
        dog.move();         // Running on four legs
        
        bird.makeSound();   // Tweet!
        bird.move();        // Flying in the sky
        
        duck.fly();         // Duck is flying
        duck.swim();        // Duck is swimming
        
        // Polymorphism
        Animal[] animals = {dog, bird};
        for (Animal animal : animals) {
            animal.makeSound();  // Calls respective implementation
        }
        
        // Access constant
        System.out.println(Animal.TYPE);  // Living Being
    }
}
