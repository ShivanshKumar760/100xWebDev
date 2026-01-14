package traversalArray.src;

public class ForEachOneD{
    public static void main(String[] args){
        int[] numbers = {1,2,3,4,5}; // array of 5 integers
        // for each loop syntax:
        /*
         * for(dataType variableName : arrayName){
         *      // code to be executed
         * }
         * 
         * Here variableName is a temporary variable that holds the value of each element in the array during each iteration of the loop.
         */
        for(int num : numbers){//here num takes value of each element of numbers array
            System.out.println(num); // accessing elements
        }
    }
}