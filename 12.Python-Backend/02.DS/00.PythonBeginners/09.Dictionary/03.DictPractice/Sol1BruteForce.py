from typing import Dict # this adds type hinting for Dict

def count_characters(word: str) -> Dict[str, int]:
    count=0
    rDict={}
    for i in word:
        for j in word:
            if i==j:
                count+=1
                rDict[i]=count
            else:
                continue
        count=0
    return rDict





# don't modify below this line
print(count_characters("hello"))
print(count_characters("world"))
print(count_characters("hello world"))
print(count_characters("this is a longer sentence"))


# O(n^2) time complexity due to nested loops