from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms

class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    # these are the fields that are required for sign-up
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password1",
            "password2",
        ]