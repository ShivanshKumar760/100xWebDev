enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}
public class EnumIfSwitch {
    public static void main(String[] args){
        Day today = Day.THURSDAY;

        // Using if-else statements
        if (today == Day.SATURDAY || today == Day.SUNDAY) {
            System.out.println("It's the weekend!");
        } else {
            System.out.println("It's a weekday.");
        }

        // Using switch statement
        switch (today) {
            case MONDAY://here we dont have to use Day.MONDAY just MONDAY is enough cause we are already in Day enum as 
            //switch(today) take Day type so it will infer that we are talking about Day enum
            case TUESDAY:
                System.out.println("Start of the work week.");
                break;
            case WEDNESDAY:
            case THURSDAY:
                System.out.println("Midweek day.");
                break;
            case FRIDAY:
                System.out.println("End of the work week.");
                break;
            case SATURDAY:
            case SUNDAY:
                System.out.println("It's the weekend!");
                break;
            default:
                System.out.println("Just another weekday.");
                break;

       
        }
        
        //enum is itself a class with fixed set of constants which cannot be extended or modified
        System.out.println(today.getClass());//this will return Day as the class which we 
        //define using enum keyword which is special type of class that has a superclass called java.lang.Enum
        System.out.println(today instanceof Enum);//this will return true as all enum types are subclass of Enum class
        System.out.println(today.getClass().getSuperclass());//this will return java.lang.Enum as the superclass of Day enum
    }
}
