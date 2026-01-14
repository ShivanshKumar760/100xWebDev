public class StaticVsNonStatic{
    //Static variable can only be called from static function 
    //Non static variable can be called from both static and non static function
    //A static function cannot directly access non-static variables/methods, but it can do so using an object reference.


    /*
     * A non-static (instance) method can directly access both:
     * Static variables & methods (because they belong to the class and are always available).
     * Non-static variables & methods (because the instance exists).
     */

     static int staticVar = 10; // Static variable
     int nonStaticVar = 20; // Non-static variable

     static void staticMethod(){
        System.out.println("Static Method:");
        System.out.println("Static Variable: " + staticVar); // Accessing static variable directly
        // System.out.println("Non-Static Variable: " + nonStaticVar); // Error: Cannot access non-static variable directly

        // To access non-static variable, we need to create an instance of the class
        StaticVsNonStatic obj = new StaticVsNonStatic();
        System.out.println("Non-Static Variable (via object): " + obj.nonStaticVar);
     }


        void nonStaticMethod(){
            System.out.println("Non-Static Method:");
            System.out.println("Static Variable: " + staticVar); // Accessing static variable directly
            System.out.println("Non-Static Variable: " + nonStaticVar); // Accessing non-static variable directly
        }


        public static void main(String[] args) {
            // Calling static method
            staticMethod();

            // Calling non-static method
            StaticVsNonStatic obj = new StaticVsNonStatic();
            obj.nonStaticMethod();
    }
}