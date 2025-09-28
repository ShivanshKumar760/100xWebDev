from typing import Dict, List

def get_dict_values(age_dict: Dict[str, int]) -> List[int]:
    getValue=[]
    for value in age_dict.values():
        getValue.append(value)
    return getValue

# do not modify below this line
print(get_dict_values({"Alice": 25, "Bob": 30, "Charlie": 35}))
print(get_dict_values({"Alice": 25, "Bob": 30, "Charlie": 35, "David": 40}))
