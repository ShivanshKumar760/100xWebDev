from typing import List

def get_last_three_elements(my_list: List[int]) -> List[int]:
    start = len(my_list) - 3
    return my_list[start:]
    # Another solution:
    # With a negative starting index, 
    # we start at the third to last element. 
    # Since we didn't specify
    # an ending index, we go to the end of the list.
    # return my_list[-3:]


# do not modify below this line
print(get_last_three_elements([1, 2, 3]))
print(get_last_three_elements([1, 2, 3, 4, 5]))
print(get_last_three_elements([1, 2, 3, 4, 5, 6, 7, 8, 9]))
