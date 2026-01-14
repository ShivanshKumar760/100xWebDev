public class ForLoop{
    public static void main(String[] args){
        int sum=0;
        int n=10;
        //Syntax of for loop
        /*
         * for(initialization; condition; increment/decrement){
         *     //body of loop
         * }
         */
        for(int i=1;i<=n;i++){
            sum+=i;
        }

        System.out.println("Sum of first "+n+" natural numbers is: "+sum);
    }
}