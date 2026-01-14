// Abstract class
abstract class Animal {
    protected String name;
    protected int age;
    
    // Constructor
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Concrete methods (have implementation)
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    // Abstract methods (no implementation - must be overridden)
    public abstract void makeSound();
    public abstract void move();
    public abstract String getSpecies();
    
    // Concrete method that uses abstract methods
    public void performActions() {
        System.out.println("=== " + name + " (" + getSpecies() + ") ===");
        eat();
        makeSound();
        move();
        sleep();
    }
}

// Concrete subclass - must implement all abstract methods
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age);    // Call parent constructor
        this.breed = breed;
    }
    
    // Must implement all abstract methods from parent
    @Override
    public void makeSound() {
        System.out.println(name + " barks: Woof! Woof!");
    }
    
    @Override
    public void move() {
        System.out.println(name + " runs on four legs");
    }
    
    @Override
    public String getSpecies() {
        return "Canine - " + breed;
    }
    
    // Dog-specific method
    public void wagTail() {
        System.out.println(name + " is wagging tail");
    }
}

class Bird extends Animal {
    private boolean canFly;
    
    public Bird(String name, int age, boolean canFly) {
        super(name, age);
        this.canFly = canFly;
    }
    
    // Must implement all abstract methods
    @Override
    public void makeSound() {
        System.out.println(name + " chirps: Tweet! Tweet!");
    }
    
    @Override
    public void move() {
        if (canFly) {
            System.out.println(name + " flies in the sky");
        } else {
            System.out.println(name + " walks on the ground");
        }
    }
    
    @Override
    public String getSpecies() {
        return "Avian" + (canFly ? " (Flying)" : " (Flightless)");
    }
}

class Fish extends Animal {
    private String waterType;
    
    public Fish(String name, int age, String waterType) {
        super(name, age);
        this.waterType = waterType;
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " makes bubbling sounds");
    }
    
    @Override
    public void move() {
        System.out.println(name + " swims in " + waterType + " water");
    }
    
    @Override
    public String getSpecies() {
        return "Aquatic (" + waterType + "water)";
    }
    
    // Override inherited method with specific behavior
    @Override
    public void sleep() {
        System.out.println(name + " sleeps while swimming slowly");
    }
}





// Implementing interface - must implement all abstract methods

public class AbstractDemo {
    public static void main(String[] args) {
        // Cannot instantiate abstract class
        // Animal animal = new Animal("Generic", 5); // Compilation Error
        
        System.out.println("=== TESTING ABSTRACT CLASS ===");
        
        // Create concrete objects
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        Bird bird = new Bird("Tweety", 1, true);
        Fish fish = new Fish("Nemo", 2, "salt");
        
        // Call methods (including abstract methods implemented by subclasses)
        dog.performActions();
        dog.wagTail();
        
        System.out.println();
        bird.performActions();
        
        System.out.println();
        fish.performActions();
        
        
        
        // Polymorphism - treating different objects the same way
        Animal[] animals = {dog, bird, fish};
        
        for (Animal animal : animals) {
            System.out.println("\n--- " + animal.getClass().getSimpleName() + " ---");
            animal.makeSound();  // Calls overridden abstract method
            animal.move();       // Calls overridden abstract method
        }
        
    }
}
