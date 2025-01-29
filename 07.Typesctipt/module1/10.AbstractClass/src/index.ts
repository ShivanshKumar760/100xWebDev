// Abstract Classes in TypeScript
// An abstract class in TypeScript is a class that cannot be 
// instantiated directly. It serves as a blueprint for other classes, 
// defining common methods and properties that subclasses must implement.

// 🔹 Key Features of Abstract Classes
// 1.Cannot be instantiated-You cannot create an object of an abstract class.
// 2.Can have abstract methods-Methods without implementation (must be implemented in subclasses).
// 3.Can have concrete methods-Methods with full implementations that can be inherited.
// Can have properties-Properties can be defined and inherited by subclasses.


abstract class Animal {
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    // Abstract method (must be implemented by subclasses)
    abstract makeSound(): void;
  
    // Concrete method (can be used by subclasses)
    move(): void {
      console.log(`${this.name} is moving.`);
    }
  }
  
  // Subclass implementing the abstract method
  class Dog extends Animal {
    makeSound(): void {
      console.log("Woof! Woof!");
    }
  }
  
  // ❌ Cannot instantiate an abstract class
  // const animal = new Animal("Some Animal");  // Error!
  
  // ✅ Creating an instance of Dog (subclass)
  const dog = new Dog("Buddy");
  dog.makeSound(); // Output: Woof! Woof!
  dog.move();      // Output: Buddy is moving.
  