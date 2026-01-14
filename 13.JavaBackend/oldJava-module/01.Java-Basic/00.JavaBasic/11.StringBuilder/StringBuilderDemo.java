public class StringBuilderDemo{
    public static void main(String[] args) {

        /*
         * Java StringBuilder
        What is StringBuilder?
        StringBuilder is a mutable sequence of characters. Unlike String, StringBuilder objects can be modified without creating new objects, making it more efficient for multiple string operations.
        Key Characteristics of StringBuilder
        1. Mutable Nature

        Content can be modified without creating new objects
        Efficient for multiple string operations
        Maintains an internal buffer that can grow as needed

        2. Not Thread-Safe

        StringBuilder is not synchronized
        Faster than StringBuffer but not safe for concurrent access
        Use StringBuffer for thread-safe operations



        */


       // Creating StringBuilder Objects

       //1.Default Constructor

       StringBuilder sb1 = new StringBuilder();  // Initial capacity: 16

       //2. With Initial Capacity

       StringBuilder sb2 = new StringBuilder(50);  // Initial capacity: 50

       //3.With Initial String

       StringBuilder sb3 = new StringBuilder("Hello");


       /*
        * Common StringBuilder Methods
        */

        //1.Append Operations


        StringBuilder sb4 = new StringBuilder("Hello");
        sb4.append(" world");
        
        System.out.println("After append: " + sb4); // Output: Hello world

        //other example:
        StringBuilder sb5 = new StringBuilder("Hello");
        sb5.append(" World");           // "Hello World"
        sb5.append(123);               // "Hello World123"
        sb5.append(true);              // "Hello World123true"
        sb5.append('!');               // "Hello World123true!"



        //2.Insert Operations
        StringBuilder sb6 = new StringBuilder("Hello");
        sb6.insert(5, " dear");//what it does is it inserts the string " dear" at index 5
        System.out.println("After insert: " + sb6); // Output: Hello dear

        //3.Delete Operation

        StringBuilder sb7 = new StringBuilder("Hello dear");
        sb7.delete(5, 10); //what it does is it deletes the characters from index 5 to index 10 (excluding index 10)
        System.out.println("After delete: " + sb7); // Output: Hello

        //4.Replace Operation
        StringBuilder sb8 = new StringBuilder("Hello world");
        sb8.replace(6, 11, "Java"); //what it does is it replaces the characters from index 6 to index 11 (excluding index 11) with the string "Java"
        System.out.println("After replace: " + sb8); // Output: Hello Java

        //5.Reverse Operation
        StringBuilder sb9 = new StringBuilder("Hello");
        sb9.reverse(); //what it does is it reverses the characters in the StringBuilder
        System.out.println("After reverse: " + sb9); // Output: olleH


        //6.toString Operation
        StringBuilder sb10 = new StringBuilder("Hello");
        String str = sb10.toString(); //what it does is it converts the StringBuilder to a String
        System.out.println("String: " + str); // Output: Hello

        //7.Length and Capacity
        StringBuilder sb11 = new StringBuilder("Hello");
        int length = sb11.length(); //what it does is it returns the length of the StringBuilder
        int capacity = sb11.capacity(); //what it does is it returns the capacity of the StringBuilder
        System.out.println("Length: " + length); // Output: 5
        System.out.println("Capacity: " + capacity); // Output: 21 (16 + 5)

        //8. Set Length
        StringBuilder sb12 = new StringBuilder("Hello");
        sb12.setLength(3); //what it does is it sets the length of the StringBuilder to 3
        System.out.println("After setLength: " + sb12); // Output: Hel

        //9. CharAt
        StringBuilder sb13 = new StringBuilder("Hello");
        char ch = sb13.charAt(1); //what it does is it returns the character at index 1
        System.out.println("Character at index 1: " + ch); // Output: e


        //10. setCharAt
        StringBuilder sb14 = new StringBuilder("Hello");
        sb14.setCharAt(1, 'a'); //what it does is it sets the character at index 1 to 'a'
        System.out.println("After setCharAt: " + sb14); // Output: Hallo
        
    }



}