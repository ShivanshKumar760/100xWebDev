def concatenate(s1: str, s2: str) -> str:
    if(len(s1)+len(s2)>10):
        return "Too long!"
    else:
        return s1+s2




# do not modify below this line
print(concatenate("He", "llo"))
print(concatenate("Hello ", "world!"))
print(concatenate("Length", "of10"))


# Alternate:
# def concatenate(s1: str, s2: str) -> str:
#     s3 = s1 + s2
#     if len(s3) <= 10:
#         return s3
#     return "Too long!"

# # do not modify below this line
# print(concatenate("He", "llo"))
# print(concatenate("Hello ", "world!"))
# print(concatenate("Length", "of10"))