from typing import List

def read_integers() -> List[int]:
    container=input()

    returnL=[]
    for i in range (len(container.split(","))):
        returnL.append(int(container.split(",")[i]))
    return returnL
        

# do not modify the code below
print(read_integers())
print(read_integers())
print(read_integers())
