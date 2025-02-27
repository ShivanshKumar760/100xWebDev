#To take input in python we use input() function:

name=input("Enter your name:")
print("My name is :",name)

#Now input() function take string as the default 
#input and even if u ente 4 it will be treated like 
#string so we use converter function which convert
#string to number or boolean

numInt=int(input("Enter a number:"))
print("Entered Number is :",numInt)
print("Type of number is :",type(numInt))

#for float it is:
numFloat=float(input("Enter the decimal point number is:"))
print("Entered Number is :",numFloat)
print("Type of number is :",type(numFloat))