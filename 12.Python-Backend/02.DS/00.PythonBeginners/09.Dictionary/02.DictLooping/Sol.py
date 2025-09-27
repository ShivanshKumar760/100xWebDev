from typing import Dict, List # this adds type hints for List and Dict

def get_dict_keys(age_dict: Dict[str, int]) -> List[str]:
    dict2List=[]
    for i in age_dict:
        dict2List.append(i)
    return dict2List

def get_dict_values(age_dict: Dict[str, int]) -> List[int]:
    dict2ListV=[]
    for i in age_dict:
        dict2ListV.append(age_dict[i])
    return dict2ListV

# do not modify below this line
dict_1 = {"John": 25, "Doe": 30, "Jane": 22}
dict_2 = {"NeetCode": 24, "NeetCode2": 25, "NeetCode3": 26}

print(get_dict_keys(dict_1))
print(get_dict_keys(dict_2))

print(get_dict_values(dict_1))
print(get_dict_values(dict_2))
