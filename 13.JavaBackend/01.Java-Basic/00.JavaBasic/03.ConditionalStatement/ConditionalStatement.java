public class ConditionalStatement{
    public static void main(String args[]){
        int age = 20;
        if (age >=10 && age <= 19) {
            System.out.println("Teenager");
        } else if (age >= 20 && age <= 29) {
            System.out.println("Twenties");
        } else {
            System.out.println("Not a teenager or in twenties maybe in thirties or forties");
        }
    }
}