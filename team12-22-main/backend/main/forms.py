# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User

# # this is the form for sign-up, with the required fields
# class RegisterForm(UserCreationForm):
#     email = forms.EmailField(required=True)

#     # these are the fields that are required for sign-up
#     class Meta:
#         model = User
#         fields = [
#             "username",
#             "email",
#             "password1",
#             "password2",
#         ]

# class FileUploadForm(forms.Form):
#     title = forms.CharField(max_length=50)
#     file = forms.FileField(widget=forms.FileInput(attrs={'accept': 'text/csv'}))



from django import forms

class UploadFileForm(forms.Form):
    file = forms.FileField()
