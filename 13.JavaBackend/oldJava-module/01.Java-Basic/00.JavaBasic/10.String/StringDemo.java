import java.util.Scanner;
public class StringDemo {
    /*A String in Java is a sequence of characters that represents text data. Strings are
    objects of the java.lang.String class and are one of the most commonly used data types in 
    Java programming.
    
    */
    public static void main(String args[]){

        //syntax to declare and initialize a string
        String str1 = "Hello, World!"; // Using string literal
        String str2 = new String("Hello, Java!"); // Using new keyword
        char[] chars = {'H', 'e', 'l', 'l', 'o'};
        String str3 = new String(chars);
        System.out.println(str1+" "+str2+" "+str3);
        //How to take String input
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a string:");
        String input = sc.nextLine(); // Reads a line of text
        System.out.println("You entered: " + input);
        sc.close();

        //Characteristics of String in Java
        //1. Immutability: Strings are immutable, meaning once created, their values cannot be changed. Any operation that seems to modify a string actually creates a new string.
        //
        //1. Immutable Nature Once a String object is created, it cannot be changed
        //Any operation that appears to modify a string actually creates a new String object
        //Original string remains unchanged in memory

        String str = "Hello";
        str = str + " World";  // Creates new String object, doesn't modify original


        //2. String Pool
        //Java maintains a special memory area called String Pool (part of heap memory)
        //String literals are stored in this pool to save memory
        //Multiple references to the same string literal point to the same object


        String s1 = "Java";     // Stored in String Pool
        String s2 = "Java";     // Points to same object in pool
        String s3 = new String("Java");  // Creates new object in heap

    }

}
