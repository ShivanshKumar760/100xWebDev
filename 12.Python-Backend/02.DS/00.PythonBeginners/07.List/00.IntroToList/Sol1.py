my_list = [1, 7, 5, 4, 3, 2]

# printing each element 
# for each_item in my_list:
#     print(each_item)

# or 
# for i in range(len(my_list)):
#     print(my_list[i])
def printGiven(arr,pos=len(my_list)):
    print(arr[pos-1])

printGiven(my_list,2)
printGiven(my_list,3)
printGiven(my_list,1)
print(len(my_list))

