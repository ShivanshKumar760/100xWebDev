//type aliases :
//what are type aliases :
//Just like interface ,type aliases are a way to create a user define datatype/structure

// In TypeScript, both interfaces and type aliases are used to define types. 
// They have similarities and differences, making each suited 
// for particular use cases. Here’s a detailed comparison:

//similarities and syntax difference:
// 1.Object Type Definition
// Both can define the shape of an object.

// Interface
interface UserInterface {
    name: string;
    age: number;
}
  
  // Type Alias
type UserType = {
    name: string;
    age: number;
};

const object1:UserInterface={name:"Shivansh",age:19};
const object2:UserType={name:"Alex",age:20};

console.log(object1);
console.log(object2);

// 2.Extending Other Types
// Both can extend or combine other types.


// Interface extends
interface PersonInterface {
  name: string;
}
interface EmployeeInterface extends PersonInterface {
  employeeId: number;
}

// Type Alias with intersection
type PersonType = {
  name: string;
};
type EmployeeType = PersonType & {
  employeeId: number;
};


const personObject1:PersonInterface={name:"Rishi"};
const employeeObject1:EmployeeInterface={name:"Rishi",employeeId:9};

const personObject2:PersonInterface={name:"Aaryansh"};
const employeeObject2:EmployeeInterface={name:"Aaryansh",employeeId:3};

console.log(employeeObject1);
console.log(employeeObject2);


// 3.Function Types
// Both can define function signatures.

// Interface
interface AddFunction {
    (a: number, b: number): number;
  }
  
  // Type Alias
type SubtractFunction = (a: number, b: number) => number;

const add:AddFunction=(num1,num2)=>{
    return num1+num2;
}  

const sub:SubtractFunction=(num1,num2)=>{
    return num2-num1;
}

console.log(add(1,2));
console.log(sub(4,6));


// 4.Extending in Interface and Type in functions

// Define a base interface for a function
interface Base {
    (a: number, b: number): number; // Function taking two numbers and returning a number
  }
  
  // Extend the Base interface to add a property
  interface Extended extends Base {
    description: string; // Additional property
  }
  
  // Implement the Extended interface
  const extendedFunction: Extended = Object.assign(
    (a: number, b: number): number => {
      return a + b; // Function implementation
    },
    { description: "This function adds two numbers" } // Add additional property
  );
  
  // Usage
  console.log(extendedFunction(3, 7)); // Output: 10
  console.log(extendedFunction.description); // Output: "This function adds two numbers"

  

// How It Works
// Base Interface:

// 1.Defines a function signature that takes two numbers as arguments and returns a number.

// Extended Interface:

//1.Inherits the function signature from Base and adds a new property (description).
//2.Object Implementation:

// The function is implemented using Object.assign, combining the function and the 
// additional property.

// Key Notes

// 1.The Object.assign method is used to merge the function with the additional
// description property.

// 2.This approach allows you to define function-like objects with additional 
// metadata or properties.


// Define a base type for a function
type BaseType = (a: number, b: number) => number;

// Extend the Base type with an additional property
type ExtendedType = BaseType & { description: string };

// Implement the Extended type
const extendedFunctionType: ExtendedType = Object.assign(
  (a: number, b: number): number => {
    return a * b; // Function implementation
  },
  { description: "This function adds two numbers" } // Additional property
);

// Usage
console.log(extendedFunctionType(5, 10)); // Output: 15
console.log(extendedFunctionType.description); // Output: "This function adds two numbers"
