#if your are some one who is comming from c++ or 
#java programming background most of the code 
#starting point is main that int main() in ++
#and public static void main(String args[]) for
#java


#and its a good practice too so in python also we 
#we will write our code in main function and it 
# will be the starting point



def main():
    print("Hello, World!")

if __name__ == '__main__':
    main()


# Main function is like the entry point of a program. However, Python interpreter runs the code right from the first line. The execution of the code starts from the starting line and goes line by line. It does not matter where the main function is present or it is present or not. Since there is no

# main()

# function in Python, when the command to run a Python program is given to the interpreter, the code that is at level 0 indentation is to be executed. However, before doing that, it will define a few special variables.

# __name__

# is one such special variable. If the source file is executed as the main program, the interpreter sets the

# __name__

# variable to have a value

# __main__

# . If this file is being imported from another module,

# __name__

# will be set to the module’s name.

# __name__

# is a built-in variable which evaluates to the name of the current module.

# Example:


# # Python program to demonstrate
# # main() function


# print("Hello")

# # Defining main function
# def main():
#     print("hey there")


# # Using the special variable 
# # __name__
# if __name__=="__main__":
#     main()
# Output:

# Hello
# hey there
# When above program is executed, the interpreter declares the initial value of name as “main”. When the interpreter reaches the if statement it checks for the value of name and when the value of if is true it runs the main function else the main function is not executed.

# Main function as Module
# Now when we import a Python script as module the

# __name__

# variable gets the value same as the name of the python script imported.

# Example:

# Let’s consider there are two Files(File1.py and File2.py). File1 is as follow.


# # File1.py 
  
# print("File1 __name__ = %s" %__name__)
  
# if __name__ == "__main__": 
#     print("File1 is being run directly")
# else: 
#     print("File1 is being imported")
# Output:

# File1 __name__ = __main__
# File1 is being run directly
# Now, when the File1.py is imported into File2.py, the value of __name__ changes.


# # File2.py 
  
# import File1 
  
# print("File2 __name__ = %s" %__name__)
  
# if __name__ == "__main__":
#     print("File2 is being run directly")
# else: 
#     print("File2 is being imported")
# Output:

# File1 __name__ = File1
# File1 is being imported
# File2 __name__ = __main__
# File2 is being run directly
# As seen above, when File1.py is run directly, the interpreter sets the

# __name__

# variable as

# __main__

# and when it is run through File2.py by importing, the __name__ variable is set as the name of the python script, i.e. File1. Thus, it can be said that if __name__ == “__main__” is the part of the program that runs when the script is run from the command line using a command like Python File1.py.

# Python Main Function – FAQs
# What is a Main Function in Python?
# In Python, a “main function” is typically used to denote the entry point of a Python script or program, similar to the main() function in languages like C and C++. While Python doesn’t require a main function to execute scripts, it’s a common practice to define a main function in a script for better organization and readability. It usually looks like this:


# def main():
#     print("Hello, World!")

# if __name__ == '__main__':
#     main()
# What is if __name__ == '__main__' in Python?
# The if __name__ == '__main__' check is used to determine whether a Python script is being run directly or being imported as a module into another script. The __name__ variable in Python is set to '__main__' when the module (script) is run directly. If the script is imported into another script, the __name__ variable will instead be set to the module’s name. This check allows certain code blocks to be run only when the module is executed as the main program.


# What is the __main__ Module in Python?
# The __main__ module is a special environment where the top-level code is executed. If you run a script directly, Python sets the __name__ attribute of the script to __main__. This means that the script is the main program being executed. For example, if you have a file named script.py and run it directly from the command line, inside script.py, __name__ will be __main__.


# What is Python __file__?
# The __file__ attribute is a built-in attribute available in Python modules. It contains the pathname of the file from which the module was loaded. This is useful for finding out the location of Python scripts and managing paths, especially when loading files based on relative paths.


# How to Call Main Function in Python with Arguments?
# To call the main function with arguments in Python, you can use the sys.argv list to access the arguments passed from the command line. Here’s how you can define and call a main function that accepts command-line arguments:


# import sys

# def main(arg1, arg2):
#     print(f"Argument 1: {arg1}")
#     print(f"Argument 2: {arg2}")

# if __name__ == '__main__':
#     if len(sys.argv) > 2:
#         main(sys.argv[1], sys.argv[2])
#     else:
#         print("Not enough arguments provided.")
# This script expects two command-line arguments. sys.argv is a list in Python, which contains the command-line arguments passed to the script. The first item in this list sys.argv[0] is always the script name, so sys.argv[1] and sys.argv[2] are the first and second command-line arguments, respectively.

