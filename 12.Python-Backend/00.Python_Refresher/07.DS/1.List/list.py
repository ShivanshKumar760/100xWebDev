my_list = [1, 2, 3, "Python"]
my_list.append(4)
my_list[0] = 0


for i in range(len(my_list)):
    print(my_list[i])


#slicing
print(my_list[1:3])
print(my_list[0:3:2])