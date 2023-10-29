/*
 * filename: complex_program.js
 * 
 * This code demonstrates a complex and sophisticated JavaScript program.
 * It simulates a virtual ecosystem with creatures that interact and evolve.
 */

// Define a Creature class with various properties and methods
class Creature {
  constructor(name, species, age, health, speed) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.health = health;
    this.speed = speed;
  }

  eat(food) {
    if (food === 'plants') {
      this.health += 10;
    } else if (food === 'meat') {
      this.health += 20;
    }
  }

  move() {
    console.log(`${this.name} is moving at a speed of ${this.speed}`);
  }

  reproduce() {
    const offspring = new Creature('Baby ' + this.name, this.species, 0, 100, 0);
    console.log(`${this.name} just had a baby named ${offspring.name}`);
    return offspring;
  }
}

// Create instances of the Creature class
const lion = new Creature('Leo', 'lion', 5, 100, 50);
const rabbit = new Creature('Bugs', 'rabbit', 2, 80, 30);
const elephant = new Creature('Dumbo', 'elephant', 15, 200, 20);

// Implement a function to simulate their interactions and evolution
function simulateEcosystem() {
  const creatures = [lion, rabbit, elephant];

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * creatures.length);
    const randomCreature = creatures[randomIndex];

    // Randomly perform actions
    if (Math.random() < 0.3) {
      randomCreature.eat('plants');
    } else if (Math.random() < 0.2) {
      randomCreature.eat('meat');
    } else if (Math.random() < 0.1) {
      randomCreature.move();
    } else {
      const offspring = randomCreature.reproduce();
      creatures.push(offspring);
    }

    randomCreature.age += 1;
    randomCreature.health -= 10;

    // Remove dead creatures
    if (randomCreature.health <= 0) {
      console.log(`${randomCreature.name} has died`);
      creatures.splice(randomIndex, 1);
    }

    // Check for evolution
    if (randomCreature.age >= 10 && randomCreature.health >= 100) {
      console.log(`${randomCreature.name} has evolved into a stronger form`);
      randomCreature.speed += 10;
    }
  }
}

// Start the ecosystem simulation
simulateEcosystem();