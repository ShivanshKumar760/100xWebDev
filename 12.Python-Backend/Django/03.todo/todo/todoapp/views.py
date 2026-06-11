from django.shortcuts import render,redirect

task=[]
# Create your views here.
def home(request):
    print(task)
    return render(request, 'todoapp/index.html',{'tasks':task})

def add(request):
    if request.method == 'POST':
        # Process the form data here (not implemented)
        task_name = request.POST.get('task')
        task.append(task_name)
        # return render(request, 'todoapp/index.html',{'tasks':task})
        return redirect('/home')
    else:
        return render(request, 'todoapp/form.html')
