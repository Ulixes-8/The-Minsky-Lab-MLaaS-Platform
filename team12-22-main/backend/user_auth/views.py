from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.conf import settings
from django.contrib.auth.models import User

# import src.main
from .forms import *

# Create your views here.
def sign_up_view (request):
    if request.method == "POST":
        print("post")
        # render a form filled with given data
        form = RegisterForm(request.POST)
        # login details are valid, then save and login the user
        if form.is_valid():
            user = form.save()
            login(request, user)

            return redirect(settings.FRONTEND_BASE_URL)
    else:
        # renders empty form on initial load
        form = RegisterForm()
    context = {
        'form' : form
    }
    return render(request, 'registration/sign_up.html', context)

def profile_view (request):
    if not request.user.is_authenticated:
        return redirect('/users/login')
    else:
        pw = User.objects.get(id=request.user.id)
        context = {
            'username': request.user.username,
            'email': request.user.email,
            'password': pw.password,
        }
        return render(request, 'registration/profile.html', context)

# def login (request):
#     if request.user.isau