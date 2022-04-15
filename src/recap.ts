const myName = "Nicolas";
const myAge = 12;
console.log(myName, myAge);

const suma = (a: number, b: number) => {
  return a + b;
};
suma(12, 11);

class Person {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `My Name is ${this.name} and I'm ${this.age} years old`;
  }
}

const firstPerson = new Person(15, "Person1");
firstPerson.getSummary();
