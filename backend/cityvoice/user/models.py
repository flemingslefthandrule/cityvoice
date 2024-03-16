from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import UserManager

class User(AbstractUser):
    username = models.CharField(max_length=300, unique=True)
    phone = models.CharField(max_length=12, unique=True,blank=True)
    photo = models.CharField(max_length=100, blank=True)
    department = models.CharField(max_length=100, blank=True)
    is_expert = models.BooleanField(default=False)
    following = models.ManyToManyField("self", blank=True, symmetrical=False, related_name="followers")
    
    objects = UserManager()
        
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    @property
    def get_followers(self):
        return self.followers.all()

    @property
    def get_following(self):
        return self.following.all()

    @property
    def get_tagged(self):
        return self.Taggedposts.all()

