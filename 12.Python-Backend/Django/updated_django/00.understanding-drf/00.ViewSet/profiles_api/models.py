from django.db import models
from django.contrib.auth.models import AbstractBaseUser , PermissionsMixin , BaseUserManager
from django.conf import settings
# Create your models here.
class UserProfileManager(BaseUserManager):
    def create_user(self , email , name , password=None):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)#normalize means to convert the email to lowercase. this is because email addresses are case insensitive. so if we have two email addresses that are the same but one is in uppercase and the other is in lowercase, then we want to treat them as the same email address. so we will convert the email address to lowercase before we save it to the database.
        user = self.model(email=email , name=name)#self.model what does this model do ?
        # self.model is a reference to the model that this manager is for. in this case, it is a reference to the UserProfile model. so when we call self.model(email=email , name=name), it will create a new instance of the UserProfile model with the email and name that we passed in. and then we will set the password for the user and save the user to the database.
        # how does it know which model to call when we call self.model? it knows because when we define the UserProfile model, we set the objects attribute to be an instance of the UserProfileManager. so when we call UserProfile.objects.create_user(email, name, password), it will call the create_user method of the UserProfileManager, and inside that method, when we call self.model(email=email , name=name), it will create a new instance of the UserProfile model because self.model is a reference to the UserProfile model.
        # but create_user is not present in the UserProfile model, it is present in the UserProfileManager. so when we call UserProfile.objects.create_user(email, name, password), it will call the create_user method of the UserProfileManager, and inside that method, when we call self.model(email=email , name=name), it will create a new instance of the UserProfile model because self.model is a reference to the UserProfile model.
        # how does from UserProfile , create_user method is called ? it is called because we set the objects attribute of the UserProfile model to be an instance of the UserProfileManager. so when we call UserProfile.objects.create_user(email, name, password), it will call the create_user method of the UserProfileManager, and inside that method, when we call self.model(email=email , name=name), it will create a new instance of the UserProfile model because self.model is a reference to the UserProfile model.
        # Now how did that self.model knew about the UserProfile cause we dint pass it ? it is because when we define the UserProfile model, we set the objects attribute to be an instance of the UserProfileManager. so when we call UserProfile.objects.create_user(email, name, password), it will call the create_user method of the UserProfileManager, and inside that method, when we call self.model(email=email , name=name), it will create a new instance of the UserProfile model because self.model is a reference to the UserProfile model.
        # but that self is inside the UserProfileManger so that self should call UserProfileManger and in that class we have no
        # attribute so if we set the object attribute in the UserProfile how does that link to UserProfileManger? it is because when we define the UserProfile model, we set the objects attribute to be an instance of the UserProfileManager. so when we call UserProfile.objects.create_user(email, name, password), it will call the create_user method of the UserProfileManager, and inside that method, when we call self.model(email=email , name=name), it will create a new instance of the UserProfile model because self.model is a reference to the UserProfile model.
        user.set_password(password)#this method is provided by the AbstractBaseUser class. it is used to set the password for the user. it takes the password as an argument and it will hash the password and save it to the database. so we don't have to worry about hashing the password ourselves. we just need to call this method and pass in the password that we want to set for the user.
        user.save(using=self._db)#self._db is used to specify which database to use when saving the user. this is useful if we have multiple databases in our project. if we don't specify which database to use, then it will use the default database. so by using self._db, we can ensure that the user is saved to the correct database.
        #how does this work internally ? when we call user.save(using=self._db), it will call the save method of the UserProfile model, and inside that method, it will check if the user already exists in the database. if it does, then it will update the existing user. if it doesn't, then it will create a new user. and then it will save the user to the database.
        return user
    def create_superuser(self , email , name , password):
        user= self.create_user(email , name , password)
        user.is_superuser = True #this field is provided by the PermissionsMixin class. it is used to determine if the user is a superuser or not. it is used to determine if the user has all permissions or not. if the user is a superuser, then they have all permissions. if the user is not a superuser, then they have only the permissions that are assigned to them.
        user.is_staff = True #this field is provided by the PermissionsMixin class. it is used to determine if the user is a staff member or not. it is used to determine if the user has access to the django admin site or not. if the user is a staff member, then they have access to the django admin site. if the user is not a staff member, then they don't have access to the django admin site.
        user.save(using=self._db)
        return user

class UserPorfile(AbstractBaseUser , PermissionsMixin):
    email = models.EmailField(max_length=255 , unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)#this field is used to determine if the user is a staff member or not. it is used to determine if the user has access to the django admin site or not.

    USERNAME_FIELD = 'email' #by default, if we set USERNAME_FIELD to email, then we will use email to authenticate the user instead of username. this is because we want to use email as the unique identifier for the user instead of username. if we set USERNAME_FIELD to username, then we will use username to authenticate the user instead of email. if we set USERNAME_FIELD to something else, then we will use that field to authenticate the user instead of email or username. in this case, we want to use email as the unique identifier for the user, so we set USERNAME_FIELD to email. and  its required by default
    REQUIRED_FIELDS = ['name']

    objects = UserProfileManager()#this is the manager for the user profile model. it is used to create a new user and a new superuser. it is also used to authenticate a user.

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):#what is this __str__ method? 
        #it is a special method in python that is used to return a 
        # string representation of an object. it is called when you use the print() 
        # function on an object or when you convert an object to a string using the 
        # str() function. in this case, it will return the email of 
        # the user profile when you print the user profile object.
        #demo 
        # class Person:
        #     def __init__(self, name):
        #         self.name = name
        #     def __str__(self):
        #         return self.name
        # person = Person("John")
        # print(person) # Output: John
        return self.email


class ProfileFeedItem(models.Model):
    #this is a reference to the user profile model. 
    #we use settings.AUTH_USER_MODEL instead of directly referencing the UserProfile model because it is a best practice to use settings.AUTH_USER_MODEL when referencing the user model in django. 
    # this is because if we ever want to change the user model in the future, 
    # we can do that easily by changing the value of AUTH_USER_MODEL in the settings.py 
    # file. if we directly reference the UserProfile model, 
    # then we would have to change all the references to that model in our 
    # code if we ever want to change the user model in the future. 
    # so by using settings.AUTH_USER_MODEL, we can avoid that problem and make 
    # our code more flexible and maintainable.
    '''this is because if we ever want to change the user model in the future, 
     we can do that easily by changing the value of AUTH_USER_MODEL in the settings.py ->Explain this line 
     in simple terms with example:
     '''
    user_profile = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        #how will this know which coloumn in 
        # the AUTH_USER_MODEL to use as fk : 
        # it will use the primary key of the AUTH_USER_MODEL as 
        # the foreign key. so in this case, it will use the id 
        # field of the UserProfile model as the foreign key. and when we create a 
        # new ProfileFeedItem, we will pass in the user_profile as an 
        # instance of the UserProfile model, and it will automatically set 
        # the user_profile_id field in the ProfileFeedItem model to the id of the 
        # UserProfile instance that we passed in.
        on_delete=models.CASCADE
    )
    status_text = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.status_text