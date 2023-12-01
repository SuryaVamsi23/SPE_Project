from django.db import models
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
class Expense(models.Model):
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    payer = models.ForeignKey(User, related_name='expenses_paid', on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='expenses_participated')

class ExpenseShare(models.Model):
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    share_amount = models.DecimalField(max_digits=10, decimal_places=2)

class Group(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(User)
    expenses = models.ManyToManyField(Expense)