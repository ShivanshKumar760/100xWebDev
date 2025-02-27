#in python we have condition statement to change 
#the flow of program that is to execute a perticular
#block of code if it meets a specific condition


age=int(input("Enter your age:"))

if(age>=13 and age<18):
    print("Elgible to enter with parents")

elif(age>=18):
    print("Elgible")

else:
    print("Not eligible")