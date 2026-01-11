abstract class Shape {
    protected String color;
    
    // Concrete method
    public void setColor(String color) {
        this.color = color;
    }
    
    // Abstract method - must be implemented by subclasses
    public abstract double calculateArea();
    public abstract void draw();
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle with area: " + calculateArea());
    }
}
public class AbstractionDemo {
 public static void main(String[] args){
     Shape shape = new Circle(5);
     shape.setColor("Red");
     shape.draw();
 }   
}
