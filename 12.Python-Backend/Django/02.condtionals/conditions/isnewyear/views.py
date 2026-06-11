from django.shortcuts import render
import datetime
# Create your views here.
# def is_new_year(request):
#     now = datetime.datetime.now()
#     if now.month == 1 and now.day == 1:
#         message = "Happy New Year!"
#     else:
#         message = "Today is not New Year's Day."
#     return render(request, 'isnewyear/newyear.html', {'message': message})
def is_new_year(request):
    now = datetime.datetime.now()
    if now.month == 1 and now.day == 1:
        return render(request, 'isnewyear/newyear.html',{"isnewyear": True})
    else:
        return render(request, 'isnewyear/newyear.html',{"isnewyear": False})

