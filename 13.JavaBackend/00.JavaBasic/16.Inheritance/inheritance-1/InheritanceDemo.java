class Animal{
    String name;
    String color;
    void eat(){
        System.out.println("This animal eats food.");
    }
}

class Dog extends Animal{
    void intro(){
        System.out.println("This is a dog named " + this.name + " and its color is " + this.color + ".");
    }
    void bark(){
        System.out.println("The dog barks.");
    }
}


class Cat  extends Animal{
    void intro(){
        System.out.println("This is a cat named " + this.name + " and its color is " + this.color + ".");
    }
    void meow(){
        System.out.println("The cat meows.");
    }
}

public class InheritanceDemo{
    public static void main(String[] args){
        Animal animal = new Animal();
        animal.name = "Generic Animal";
        animal.color = "Unknown";
        System.out.println("Animal Name: " + animal.name);
        System.out.println("Animal Color: " + animal.color); // color is not set yet
        animal.color = "Gray";
        animal.eat();
        Dog dog = new Dog();
        dog.name = "Buddy";
        dog.color = "Brown";
        dog.intro();
        dog.eat();
        dog.bark();


        //cat
        Cat cat = new Cat();
        cat.name = "Whiskers";
        cat.color = "White";
        cat.intro();
        cat.eat();
        cat.meow();
    }
}