import java.util.*;
public class TwoD{
    public static void main(String[] args){
        // Declare a 2D array of integers syntax:
        /*
         * dataType[][] arrayName = new dataType[rows][columns];
         * 
         * Now the other question is why object use new keyword to create?
         * because object are created in heap memory and we use new keyword to allocate memory in heap
         * they are not stored in stack memory
         */
         Scanner sc = new Scanner(System.in);
         System.out.println("Enter number of rows and columns:");
         int rowsInput = sc.nextInt();
         int colsInput = sc.nextInt();
         int[][] numbers = new int[rowsInput][colsInput]; // 2D array of 3 rows and 4 columns

         int rows=rowsInput; // number of rows
         int cols=colsInput; // number of columns

         // taking input
         for(int i=0;i<rows;i++){
            for(int j=0;j<cols;j++){
                System.out.println("Enter the number at row "+i+" and column "+j);
                numbers[i][j]=sc.nextInt(); // assigning value
            }
         }

        // accessing elements
        for(int i=0;i<rows;i++){
            for(int j=0;j<cols;j++){
                System.out.print(numbers[i][j]+" "); // accessing elements
            }
            System.out.println(); // new line after each row
        }  
    } 
}