class Hero {
    protected String name;
    protected int health;
    protected int strength;

    public Hero(String name, int health, int strength) {
        this.name = name;
        this.health = health;
        this.strength = strength;
    }

    public String attack() {
        return name + " attacks with strength " + strength + "!";
    }

    public String heal(int amount) {
        this.health += amount;
        return name + " heals for " + amount + " points! Current health: " + health;
    }
}


class Villain extends Hero {
    private String evilPlan;

    public Villain(String name, int health, int strength, String evilPlan) {
        super(name, health, strength);
        this.evilPlan = evilPlan;
    }

    public String executePlan() {
        return this.name + " executes their evil plan: " + evilPlan + "!";
    }
}


public class Main {
    public static void main(String[] args) {
        Hero hero = new Hero("Archer", 100, 15);
        Villain villain = new Villain("Dark Lord", 150, 20, "Take over the world");
        
        System.out.println(hero.attack());
        System.out.println(hero.heal(20));
        System.out.println(villain.executePlan());
        System.out.println(villain.attack());
    }
}