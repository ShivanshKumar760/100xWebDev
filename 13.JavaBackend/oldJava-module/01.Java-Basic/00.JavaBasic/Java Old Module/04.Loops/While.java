public class While {
    public static void main(String[] args) {
        /*
         * A loop is a programming construct that repeats a block of code a certain number of times
         * or until a specific condition is met.
         * There are several types of loops in Java, including:
         * 1. for loop: Used when the number of iterations is known beforehand.
         * 2. while loop: Used when the number of iterations is not known beforehand.
         * 3. do-while loop: Similar to the while loop, but guarantees at least one iteration.
         * 4. enhanced for loop: Used to iterate over arrays and collections.
         */

        // 2. while loop:
        int givenNumber=25;
        int divisors=1;
        boolean isTrue=true;
        while (isTrue) {
            if(divisors==1){
                divisors++;
                continue;
            }
            if(divisors==givenNumber){
                System.out.println("The number is prime");
                System.out.println("Hence True");
                isTrue=false;
                break;
            }
            else if (givenNumber % divisors == 0 && divisors!=givenNumber) {
                System.out.println("The number is divisible by " + divisors);
                System.out.println("Hence Not prime");
                isTrue=false;
                break;
            }
            else{
                divisors++;
            }
        }
}

}
