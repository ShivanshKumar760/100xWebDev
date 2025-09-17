def add_one(n):
    n = n + 1
    print(n)   

n = 10

add_one(n)     # Output: 11

print(n)       # Output: ?
#10


"""
The value of the variable n outside the function remains unchanged because the variable n 
inside the function is a different variable, even though they share the same name. 
When we pass the value of n into the function, the function creates a new copy of n that is 
local to the function (only accessible within the function). Any changes made to this local 
variable do not affect the original variable outside the function.
"""