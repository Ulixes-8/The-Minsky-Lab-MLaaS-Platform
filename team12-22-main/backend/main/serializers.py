from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ('user', 'top_features_data', 'X_normalized_data', 'y_data', 'scaler')


class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        label='Username',
        write_only=True,
    )
    password = serializers.CharField(
        label='Password',
        trim_whitespace=False,
        write_only=True,
        style={'input_type': 'password'},
    )

    def validate(self, attrs):
        # Get the entered username and password
        username = attrs.get('username')
        password = attrs.get('password')

        # Check for both username and password
        if username and password:
            # Try and authenticate the user
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            if not user:
                msg = "Incorrect username or password."
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = "Please enter both a username and a password"
            raise serializers.ValidationError(msg, code='authorization')
        attrs['user'] = user
        return attrs

class NewUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password1 = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def validate(self, attrs):
        username = attrs.get('username')
        password1 = attrs.get('password1')
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password': "Passwords don't match"}
            )
        return attrs

    def create(self, valid_data):
        user = User.objects.create(
            username=valid_data['username'],
            email=valid_data['email'],
        )
        user.set_password(valid_data['password'])
        user.save()
        return user

# class UploadFileSerializer(serializers.Serializer):
#     class Meta:
#         model = File
#         fields = ('file', 'user')


# class RegressionModelSerializer(serializers.Serializer):
#     class Meta:
#         model = Model
#         fields = ()