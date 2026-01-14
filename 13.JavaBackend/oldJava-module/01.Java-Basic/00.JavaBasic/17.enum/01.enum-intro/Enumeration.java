enum Color {
    RED,
    GREEN,
    BLUE
}
public class Enumeration{
    public static void main(String[] args){
        Color myColor = Color.RED;
        System.out.println("My favorite color is: " + myColor);
        System.out.println(Color.values());//this is will give a id  ntity hash code of the array
        //instead we can use a loop to print all colors
        for (Color color : Color.values()) {
            System.out.println("Color: " + color);
        }
        //to store a array in variable 
        Color[] colors = Color.values();
        // System.out.println("All colors:");
        // for (Color color : colors) {
        //     System.out.println(color);
        // }
        System.out.println("Total colors: " + colors.length);
    }
}