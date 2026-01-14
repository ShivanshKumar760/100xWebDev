public class WhileLoop{
    public static void main(String[] args){
        int iterator=1;
        int sum=0;
        int n=10;
        //Syntax of while loop
        /*
         * while(condition){
         *     //body of loop
         *     //increment/decrement
         * }
         */
        while(iterator<=n){
            sum+=iterator;
            iterator++;
        }

        //another way or the most correct way to use while loop is when we dont know a 
        //condition
        // boolean flag=true;
        // while(flag){
        //     sum+=iterator;
        //     iterator++;
        //     if(iterator>10){
        //         flag=false;
        //         break;
        //     }

            
        // }
        System.out.println("Sum of first "+n+" natural numbers is: "+sum);
    }

}