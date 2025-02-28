from django.db import models#this is the base model class and if we are going to create our own model we will need 
#its property so we will extand our model to use base class props

# Create your models here.

#this is orm

class Questions(models.Model):
    #fields we need our question table to have
    question_text=models.CharField(max_length=200)
    pub_date=models.DateTimeField("Data published")

    def __str__(self):
        return self.question_text
    
class Choice(models.Model):
    question = models.ForeignKey(Questions,on_delete=models.CASCADE)#this means if there is a model that's deleted all of 
    #its choice will also get deleted

    choice_text=models.CharField(max_length=200)
    votes=models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text