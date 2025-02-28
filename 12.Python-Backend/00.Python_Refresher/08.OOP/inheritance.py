class Person:
    def __init__(self, name, age):#constructor
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hello, I'm {self.name}")


class Student(Person):#inheritance like class Student Extends Person
    def __init__(self, name, age, student_id):
        super().__init__(name, age)#super means overiding the parent class and adding a new key to it with prev one
        self.student_id = student_id
    def greetFull(self):
        print(f"Hello, I'am {self.name},{self.age} and {self.student_id}")


p1 = Person("Shivansh", 24)
p1.greet()


p2=Student("Shivansh",20,1234)
p2.greetFull()