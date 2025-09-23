from typing import List

def get_last_three_elements(my_list: List[int]) -> List[int]:
    return  my_list[len(my_list)-3:len(my_list)]

# do not modify below this line
print(get_last_three_elements([1, 2, 3]))
print(get_last_three_elements([1, 2, 3, 4, 5]))
print(get_last_three_elements([1, 2, 3, 4, 5, 6, 7, 8, 9]))
