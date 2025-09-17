def get_min(a: int, b: int) -> int:
    if(a>b):
        return b
    if(b>a):#this is different than else if cause even if the above condition satisfy it will still check this 
        return a
    else:
        return a or b

    
# don't modify code below this line
print(get_min(10, 11))
print(get_min(5, -7))
print(get_min(20, 20))
