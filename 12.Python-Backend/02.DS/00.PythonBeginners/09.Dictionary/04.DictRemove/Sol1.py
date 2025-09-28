from typing import Dict, List
# You’re iterating over a dictionary and modifying it at the same time (del my_dict[i] while looping).
# That’s why Python throws RuntimeError: dictionary changed size during iteration.
# def remove_keys(my_dict: Dict[str, int], keys: List[str]) -> Dict[str, int]:
#     for i in my_dict:
#         if i in keys:
#             del my_dict[i]
#     return my_dict
def remove_keys(my_dict: Dict[str, int], keys: List[str]) -> Dict[str, int]:
    dictKeyList=list(my_dict.keys())
    # print(dictKeyList)
    for i in dictKeyList:
        if i in keys:
            del my_dict[i]
    return my_dict



# do not modify below this line
print(remove_keys({"a": 1, "b": 2, "c": 3}, ["a", "c"]))
print(remove_keys({"a": 1, "b": 2, "c": 3}, ["d"]))
