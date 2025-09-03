class Hero {
  constructor(name, health, strength) {
    this.name = name;
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return `${this.name} attacks with strength ${this.strength}!`;
  }

  heal(amount) {
    this.health += amount;
    return `${this.name} heals for ${amount} points! Current health: ${this.health}`;
  }
}

class Villain extends Hero {
  constructor(name, health, strength, evilPlan) {
    super(name, health, strength);
    this.evilPlan = evilPlan;
  }

  executePlan() {
    return `${this.name} executes their evil plan: ${this.evilPlan}!`;
  }
}

let hero = new Hero("Archer", 100, 15);
let villain = new Villain("Dark Lord", 150, 20, "Take over the world");
console.log(hero.attack());
console.log(hero.heal(20));
console.log(villain.executePlan());
console.log(villain.attack());
