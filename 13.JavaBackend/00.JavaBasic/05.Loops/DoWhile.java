public class DoWhile{
    public static void main(String args[]){
        int iterator=1;
        int sum=0;
        int n=10;
        //Syntax of do-while loop
        /*
         * do{
         *     //body of loop
         *     //increment/decrement
         * }while(condition);
         */
        do{
            sum+=iterator;
            iterator++;
        }while(iterator<=n);

        System.out.println("Sum of first "+n+" natural numbers is: "+sum);
    }
}