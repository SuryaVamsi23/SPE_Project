from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def res(request):
    return HttpResponse("<h1> Hoi man </h1>")