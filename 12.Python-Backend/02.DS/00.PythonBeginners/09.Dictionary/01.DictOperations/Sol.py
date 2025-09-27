your_dict = { 
  "a": 10, 
  "apple": 12,
  "bat": 7
}


def pE(entity):
    print(entity)

pE(your_dict)
pE(your_dict["a"])

check=""
for i in your_dict:
    if i=="d":
        check="True"
        break
    else:
        check="False"
print(check)
your_dict["a"]=4
pE(your_dict)