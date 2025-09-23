from typing import List

def contains_duplicate(words: List[str]) -> bool:
    convert_set=set(words)
    set_length=0
    for element in convert_set:
        set_length+=1
    if set_length!=len(words):
        return True
    else:
        return False

# do not modify code below this line
print(contains_duplicate(["hello", "world", "hello"]))
print(contains_duplicate(["hello", "world", "i", "am", "great"]))
print(contains_duplicate(["hello", "hello", "hello"]))
print(contains_duplicate(["Hello", "hellooo", "hello"]))
