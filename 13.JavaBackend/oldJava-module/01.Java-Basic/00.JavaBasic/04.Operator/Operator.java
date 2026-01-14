public class Operator{
    public static void main(String args[]){
        int a = 10;
        int b = 20;
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("b / a = " + (b / a));
        System.out.println("b % a = " + (b % a));
        System.out.println("a++ = " + (a++));
        System.out.println("++a = " + (++a));
        System.out.println("b-- = " + (b--));
        System.out.println("--b = " + (--b));

        // Logical Operators
        boolean x = true;
        boolean y = false;
        System.out.println("x && y = " + (x && y));
        System.out.println("x || y = " + (x || y));
        System.out.println("!x = " + (!x));

        //bitwise operators
        int p = 5;  // 0101 in binary
        int q = 3;  // 0011 in binary
        System.out.println("p & q = " + (p & q)); // 0001 in binary
        System.out.println("p | q = " + (p | q)); // 0111 in binary
        System.out.println("p ^ q = " + (p ^ q)); // 0110 in binary
        System.out.println("~p = " + (~p));       // 1010 in binary (two's complement)
    }
}