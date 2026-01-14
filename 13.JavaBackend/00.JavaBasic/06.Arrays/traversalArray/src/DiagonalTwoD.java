package traversalArray.src;

public class DiagonalTwoD {
    public static void main(String[] args){
        int rows=3;
        int cols=3;
        int [][] nums= new int[rows][cols];

        //assigning value to all elements default value is 0
        for (int i=0;i<rows;i++){
            for (int j=0;j<cols;j++){
                nums[i][j]=0;
            }
        }
        // assigning value to diagonal elements
        for (int i=0;i<rows && i<cols;i++){
            nums[i][i]=i+1; // assigning value to diagonal elements so diagonal elements will be 1,2,3
        }

        //printing the 2D array
        for (int i=0;i<rows;i++){
            for (int j=0;j<cols;j++){
                System.out.print(nums[i][j]+" "); // accessing elements
            }
            System.out.println(); // new line after each row
        }

        //printing diagonal elements
         for (int i=0;i<rows && i<cols;i++){
            System.out.print(nums[i][i]+" "); // accessing diagonal elements
        }

        System.out.println();
        //reverse diagonal elements
        for(int i=0;i<rows;i++){
            for(int j=0;j<cols;j++){
                if(i+j==cols-1){
                    System.out.print(nums[i][j]+" "); // accessing reverse diagonal elements
                }
            }
        }
        System.out.println();
        //alternate method:
           for(int i=0;i<rows;i++){
            int last = cols-1-i;
            if(last>=0 && last<cols){
                System.out.print(nums[i][last]+" "); // accessing reverse diagonal elements
            }
        }
    }
}
