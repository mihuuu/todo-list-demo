from django.db import models
# Create your models here.


class Todo(models.Model):
    PRI_CHOICES = (
        (1, 'top'), (2, 'important'), (3, 'common')
    )
    id = models.CharField(max_length=30, primary_key=True)
    content = models.CharField(max_length=50)
    finished = models.BooleanField(default=False)
    priority = models.IntegerField(default=3, choices=PRI_CHOICES)
    expire_date = models.DateTimeField(null=True)
    c_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "todo"
        ordering = ["-c_time"]
        verbose_name = "todo"


class User(models.Model):
    user_name = models.CharField(max_length=20, primary_key=True)
    password = models.CharField(max_length=30)
    c_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "user"
        verbose_name = "user"
