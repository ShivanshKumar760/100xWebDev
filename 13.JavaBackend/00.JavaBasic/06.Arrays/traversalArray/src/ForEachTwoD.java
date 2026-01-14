package traversalArray.src;

public class ForEachTwoD {
    public static void main(String[] args) {
        int[][] numbers = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } }; // 2D array of integers
        // for each loop syntax:
        /*
         * for(dataType[] row : arrayName){//row variable is type of array and take a sub-array of 2D array
         *      for(dataType element : row){//this is just a normal for each loop
         *          // code to be executed
         *      }
         * }
         * 
         * Here row is a temporary variable that holds the reference of each sub-array in the 2D array during each iteration of the outer loop.
         * And element is a temporary variable that holds the value of each element in the sub-array during each iteration of the inner loop.
         */
        for (int[] row : numbers) { // here row takes value of each sub-array of numbers array
            for (int num : row) { // here num takes value of each element of row array
                System.out.print(num + " "); // accessing elements
            }
            System.out.println(); // new line after each row
        }
    }
}
