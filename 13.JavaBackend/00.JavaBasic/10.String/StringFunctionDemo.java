public class StringFunctionDemo {
    public static void main(String[] args){
        //string declration 
        String str1="Hello"; // string literal
        // String str2=new String("World"); // using new keyword
        //Commonly used string methods

        //1. length() - returns the length of the string
        System.out.println("Length of str1: " + str1.length()); // Output: 5

        //2. charAt(int index) - returns the character at the specified index
        System.out.println("Character at index 1 of str1: " + str1.charAt(1)); // Output: e

        //3. substring(int beginIndex, int endIndex) - returns a substring from beginIndex to endIndex-1
        System.out.println("Substring of str1 from index 1 to 4: " + str1.substring(1, 4)); // Output: ell
        System.out.println("Substring of str1 from index 2 to end: " + str1.substring(2)); // Output: llo

        //4. toLowerCase() - converts the string to lowercase
        System.out.println("str1 in lowercase: " + str1.toLowerCase()); // Output: hello
        //5. toUpperCase() - converts the string to uppercase
        System.out.println("str1 in uppercase: " + str1.toUpperCase()); // Output: HELLO
        //6. trim() - removes leading and trailing whitespace
        String str3 = "   Hello World   ";
        System.out.println("Trimmed str3: '" + str3.trim() + "'"); // Output: 'Hello World'
        //7. replace(char oldChar, char newChar) - replaces all occurrences of oldChar with newChar
        System.out.println("str1 after replacing 'l' with 'x': " + str1.replace('l', 'x')); // Output: Hexxo
        //8. indexOf(String str) - returns the index of the first occurrence of the specified substring
        System.out.println("Index of 'lo' in str1: " + str1.indexOf("lo")); // Output: 3
        //9. equals(Object anObject) - compares two strings for equality
        System.out.println("str1 equals 'Hello': " + str1.equals("Hello")); // Output: true
        //10. equalsIgnoreCase(String anotherString) - compares two strings for equality, ignoring case differences
        System.out.println("str1 equalsIgnoreCase 'hello': " + str1.equalsIgnoreCase("hello")); // Output: true

    }
}
