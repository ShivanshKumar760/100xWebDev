class Person:
    def __init__(self, name, age):#constructor
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hello, I'm {self.name}")

p1 = Person("Shivansh", 24)
p1.greet()
