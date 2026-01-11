import java.util.Scanner;
public class OneD{
    public static void main(String[] args){
        // Declare an array of integers syntax:
        /*
         * dataType[] arrayName = new dataType[arraySize];
         * why keyword new?
         * because arrays are objects in Java and we use new keyword to create objects
         * 
         * Now the other question is why object use new keyword to create?
         * because object are created in heap memory and we use new keyword to allocate memory in heap
         * they are not stored in stack memory
         */

         Scanner sc=new Scanner(System.in);
         int size=sc.nextInt();
         int[] numbers = new int[5]; // array of 5 integers
         int[] numbers2 = new int[size]; // array of size integers

         int len=numbers.length; // length of 
         for(int i=0;i<len;i++){
            System.out.println("Enter the number at index "+i);
            numbers[i]=sc.nextInt(); // taking input
        }

          for(int i=0;i<size;i++){
            System.out.println("Enter the number at index "+i+" for second array");
            numbers2[i]=sc.nextInt(); // taking input
        }


        for(int i=0;i<len;i++){
            System.out.println("The number at index "+i+" is "+numbers[i]); // accessing elements
        }

        for(int i=0;i<size;i++){
            System.out.println("The number at index "+i+" for second array is "+numbers2[i]); // accessing elements
        }
    }
}