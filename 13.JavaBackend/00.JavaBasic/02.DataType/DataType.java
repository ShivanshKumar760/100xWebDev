public class DataType{
    public static void main(String args[]){
        // Primitive Data Types
        int myNum = 5;               // Integer (whole number)
        float myFloatNum = 5.99f;    // Floating point number
        char myLetter = 'D';         // Character
        boolean myBool = true;       // Boolean
        //type of interger 
        byte myByte = 100;           // Byte
        short myShort = 5000;        // Short
        long myLong = 15000000000L;  // Long
        
        //type of floating point
        double myDouble = 19.99d;    // Double

        //Size of each above data type is :
        System.out.println("Size of int: " + Integer.BYTES + " bytes");//4 bytes
        System.out.println("Size of float: " + Float.BYTES + " bytes");//4 bytes
        System.out.println("Size of char: " + Character.BYTES + " bytes");//2 bytes
        System.out.println("Size of boolean: " + 1 + " byte (not precisely defined)");//1 byte
        System.out.println("Size of byte: " + Byte.BYTES + " bytes");//1 byte
        System.out.println("Size of short: " + Short.BYTES + " bytes");//2 bytes
        System.out.println("Size of long: " + Long.BYTES + " bytes");//8 bytes
        System.out.println("Size of double: " + Double.BYTES + " bytes");//8 bytes

        //the range of each of them is 2^(number of bits)/2 to 2^(number of bits)/2 -1 for signed types
        System.out.println("Range of int: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);//-2,147,483,648 to 2,147,483,647
        System.out.println("Range of float: " + Float.MIN_VALUE + " to " + Float.MAX_VALUE);//1.4E-45 to 3.4028235E38
        System.out.println("Range of char: " + (int)Character.MIN_VALUE + " to " + (int)Character.MAX_VALUE);//0 to 65535
        System.out.println("Range of byte: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);//-128 to 127
        System.out.println("Range of short: " + Short.MIN_VALUE + " to " + Short.MAX_VALUE);//-32,768 to 32,767
        System.out.println("Range of long: " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);//-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
        System.out.println("Range of double: " + Double.MIN_VALUE + " to " + Double.MAX_VALUE);//4.9E-324 to 1.7976931348623157E308

    }
}