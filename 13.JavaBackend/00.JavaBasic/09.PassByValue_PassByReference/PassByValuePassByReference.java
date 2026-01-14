import java.util.Scanner;

public class PassByValuePassByReference{
        //pass by value is a technique where we pass a value to a function as an argument/parameter
        //but inside the function we cannot change the value of the original variable  instead
        //what it does is it creates a local copy of the variable and any changes made to the local copy
        //inside that function

        //pass by reference is a technique where we pass the reference of a variable to a function as an argument/parameter
        //resulting in the function being able to modify the original variable's value directly

        //Now in java everything is pass by value

        /*
         * Java is pass by value, 
         * but this often confuses people because of how object references work. Let me explain:
         * Java is always pass by value. However, the "value" being passed depends on the data type:
         * Primitives: The actual value is passed
         * Objects: The value of the reference (memory address) is passed
         * 
         * 
         * Example for primitive type (int, char, etc.):
         * public static void modifyPrimitive(int x) {
         *  x = 100;  // Only modifies the local copy
         * }

            public static void main(String[] args) {
                int num = 5;
                modifyPrimitive(num);
                System.out.println(num);  // Still 5 - original unchanged
            }


            //Pass by reference example with objects:
             public static void modifyObject(List<String> list) {
            list.add("new item");  // Modifies the object the reference points to
            }

            public static void reassignReference(List<String> list) {
                list = new ArrayList<>();  // Only changes the local reference copy
                list.add("won't be seen");
            }

            public static void main(String[] args) {
                List<String> myList = new ArrayList<>();
                myList.add("original");
                
                modifyObject(myList);
                System.out.println(myList);  // [original, new item]
                
                reassignReference(myList);
                System.out.println(myList);  // Still [original, new item]
    }
    Common Confusion
    People think Java is "pass by reference" for objects because:
    You can modify the object's state through the reference
    But you're actually using a copy of the reference value to access the same object

    Summary

    Java is always pass by value
    For primitives: value of the data is copied
    For objects: value of the reference (memory address) is copied
    You can modify object state but cannot change what the original reference points to

    This is why Java is described as "pass by value" in the official documentation and by 
    language designers.
    */


    public static void modifyPrimitive(int x) {
        x = 100;  // Only modifies the local copy
    }

    public static void modifyObject(int[] arr){
        Scanner sc= new Scanner(System.in);
        for(int i=0;i<arr.length;i++){
            arr[i]=sc.nextInt(); // Modifies the object the reference points to
        }
        sc.close();
    }


    public static void printObjext(int[] arr){
        for(int i=0;i<arr.length;i++){
            System.out.print(arr[i]+" "); // Modifies the object the reference points to
        }
        System.out.println();
    }


    public static void main(String [] args) {
        int num = 5;
        modifyPrimitive(num);
        System.out.println(num);  // Still 5 - original unchanged

        int[] myArray = new int[5];
        modifyObject(myArray);
        printObjext(myArray); // prints the modified array
    }
}