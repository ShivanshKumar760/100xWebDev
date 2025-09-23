from typing import List

def count_unique_words(words: List[str]) -> int:
    convert_set=set(words)
    unique=0
    for element in convert_set:
        unique+=1
    return unique

# do not modify code below this line
print(count_unique_words(["hello", "world", "hello", "goodbye"]))
print(count_unique_words(["hello", "world", "i", "am", "world"]))
print(count_unique_words(["hello", "hello", "hello"]))
print(count_unique_words([]))
