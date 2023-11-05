import datetime
import logging
from http.client import HTTPResponse
import pandas as pd
import numpy as np
import seaborn as sns
import pickle
from io import BytesIO
import base64
import matplotlib.pyplot as plt
import json

from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.core import serializers

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser

from .serializers import *
from .models import User
from src import dataUpload, dataPreprocessing, fileUpload, hyperparameterTuning, modelTraining

#Import mlp classifier
from sklearn.neural_network import MLPClassifier, MLPRegressor
#import random forest classifier
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
#import standard scaler
from sklearn.preprocessing import StandardScaler, MinMaxScaler


# Create your views here.

# --------------------------------
# DOCUMENTATION:
# - All views return data as JSON.
# - All POST views will return a binary variable called 'success', which will be True on correct execution of the view,
# and otherwise False. When this is False, a field called 'details' will also be returned, which will contain details
# on the nature of the error.
# - ALl GET requests will return a binary variable called 'success', which will be True on correct execution of the
# view, and otherwise False. When this is False, a field called 'details' will also be returned, which will contain
# details on the nature of the error. When a successful request has been made, the necessary information will also be
# returned.
# --------------------------------

# Standard response from view
resp_template = {
    'success': False,
    'details': '',
}


def response_template():
    return resp_template.copy()


# -------- TMP VIEWS --------

class TMPView(APIView):
    def get(self, request):
        user = User.objects.get(id=request.user.id)

        datasets = Dataset.objects.filter(user=user)
        nn = NeuralNetwork.objects.filter(user=user)

        r = []

        for d in datasets:
            r.append(
                {
                    'id': d.dataset_id,
                    'tf': d.get_top_features(),
                    # 'xn': d.get_X_normalized(),
                    # 'y': d.get_y(),
                    # 'scl': d.get_scaler(),
                }
            )

        r.append({'1': 'Neural network start'})

        for n in nn:
            r.append(
                {
                    'nid': n.neural_network_id,
                    'ntf': n.get_top_features(),
                    'npm': n.get_performance_metrics(),
                    'nnn': n.name,
                }
            )

        return Response(r)

class VOTest(APIView):
    def get(self, request):
        resp = {
            'text': 'This is a test',
        }
        return JsonResponse(resp)

class ViewUser(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication, )
    # permission_classes = (AllowAny, )
    def get(self, request):
        print("username"+request.user.username)
        print(request.user.is_authenticated)
        print(request.headers)
        # print("r.u " + request.user)
        if not request.user.is_authenticated:
            return redirect(settings.FRONTEND_BASE_URL + 'users/login')
        else:
            user = User.objects.get(id=request.user.id)
            serializer = UserSerializer(user)
            return Response(serializer.data)


class ViewAllUsers(APIView):

    def get(self, request):
        resp = response_template()

        print(resp)
        users = User.objects.all()
        data = serializers.serialize('json', users, fields=('id', 'username', 'email'))
        return Response(data)


# class ModelCreate(APIView):
#     def get(self, request):
#         user = User.objects.get(id=request.user.id)
#         print(user.id)
#         try:
#             dataset1 = Dataset.objects.create(
#                 user=user,
#             )
#         except:
#             dataset1 = Dataset.objects.get(user=user)
#
#         model1 = Model.objects.create(
#             type='RE',
#             user=user,
#             description="This is model 1",
#             name="Model 1",
#             dataset=dataset1,
#             model=bytes.fromhex('6A'),
#         )
#         model2 = Model.objects.create(
#             type='CL',
#             user=user,
#             description="This is model 2",
#             name="Model 2",
#             dataset=dataset1,
#             model=bytes.fromhex('F4'),
#         )
#         dataset1.save()
#
#         model1.save()
#         model2.save()
#
#         return JsonResponse({'good': True})


# -------- UTILITY VIEWS --------

# Allows for CSRF to be bypassed if required
class CSRFExempt(SessionAuthentication):
    def enforce_csrf(self, request):
        return


# Returns a CSRF token to the client
@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie made'})


# -------- USER ACCOUNT VIEWS --------

# Allows the user to sign-up for an account
@method_decorator(csrf_protect, name="dispatch")
class UserSignupView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        resp = response_template()

        username = data['username']
        email = data['email']
        password1 = data['password1']
        password2 = data['password2']

        if password1 == password2:
            try:
                if User.objects.filter(username=username).exists():
                    resp['details'] = 'Username is not unique'
                    return JsonResponse(resp)
                else:
                    if len(password1) < 6:
                        resp['details'] = 'Password too short'
                        return JsonResponse(resp)
                    else:
                        user = User.objects.create_user(username=username, email=email, password=password1)
                        login(request, user)
                        user.save()
                        resp['success'] = True
                        return JsonResponse(resp)
            except:
                resp['details'] = 'Problem during signup'
                return JsonResponse(resp)
        else:
            resp['details'] = 'Passwords do not match'
            return JsonResponse(resp)


# Returns a Boolean of 'auth', stating if the current user is logged in or not.
@method_decorator(csrf_protect, name="dispatch")
class UserAuthenticatedView(APIView):

    def get(self, request, format=None):
        try:
            is_auth = request.user.is_authenticated

            if is_auth:
                # user = User.objects.get(id=request.user)
                print(request.user.id)
                return JsonResponse({'auth': True})
            else:
                return JsonResponse({'auth': False})
        except:
            return JsonResponse({'error': 'problem whilst checking authentication'})


# Allows the user to login
@method_decorator(csrf_protect, name="dispatch")
class UserLoginView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        resp = response_template()

        username = data['username']
        password = data['password1']

        try:
            user = authenticate(username=username, password=password)

            if user is not None:
                # print("username: {}, password: {}, user auth: {}".format(username, password, user.id))
                login(request, user)
                resp['success'] = True
                return JsonResponse(resp)
            else:
                # print("the user is invalid")
                resp['details'] = "Credentials invalid."
                return JsonResponse(resp)
        except:
            # print("there was an error")
            resp['details'] = "problem whilst logging in"
            return JsonResponse(resp)


# Allows user to logout
@method_decorator(csrf_protect, name="dispatch")
class UserLogoutView(APIView):

    def post(self, request, format=None):
        resp = response_template()

        try:
            logout(request)
            resp['success'] = True
            return JsonResponse(resp)
        except:
            resp['details'] = "Error whilst logging out"
            return JsonResponse(resp)


# -------- API VIEWS --------

# Gets the file uploaded from the user and saves it
@method_decorator(csrf_protect, name='dispatch')
class FileUpload(APIView):

    def post(self, request, *args, **kwargs):
        user = request.user
        resp = response_template()
        if not user.is_authenticated:
            resp['details'] = "User not logged in"
            return JsonResponse(resp)

        file = request.data['file']
        fileUpload.file_handler(file, user.id)
        resp['success'] = True
        print("upload done")
        return JsonResponse(resp)


# @login_required
class PreprocessingView (APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, ]
    permission_classes = (AllowAny, )

    def get(self, request):
        if not request.user.is_authenticated:
            resp = response_template()
            resp['details'] = "User is not logged in"
            return JsonResponse(resp)
        # if not request.user.is_authenticated:
        #     user = User.objects.get(id=2)
        # else:
        user = User.objects.get(id=request.user.id)

        print("start process")

        # Check if the user already has an associated Dataset object
        existing_dataset = Dataset.objects.filter(user=user).first()
        if existing_dataset:
        # Delete the existing Dataset object
            existing_dataset.delete()

        df = pd.read_csv(fileUpload.make_file_path(user.id))
        first_alt_data, first_image = dataPreprocessing.first_image_generator(df)

        print("gen first image")

        # Data Exploration
        dataset_info_str = dataUpload.dataset_info(df)
        is_classification_str = dataUpload.is_classification_verbose(df)
        preview_data_str = dataUpload.preview_data(df)
        check_missing_values_str = dataUpload.check_missing_values(df)
        check_infinite_values_str = dataUpload.check_infinite_values(df)
        check_duplicates_str = dataUpload.check_duplicates(df)
        drop_rows_str = dataUpload.drop_rows(df)

        # Data Cleaning
        # df = dataPreprocessing.remove_missing_values(df)
        # remove_missing_values_str = dataPreprocessing.remove_missing_values_verbose(df)
        
        remove_missing_values_str = dataPreprocessing.impute_missing_values_verbose(df)
        df = dataPreprocessing.impute_missing_values(df)
        
        remove_infinite_values_str = dataPreprocessing.remove_infinite_values_verbose(df)
        df = dataPreprocessing.remove_infinite_values(df)

        # df = dataPreprocessing.remove_duplicates(df)
        remove_duplicates_str = dataPreprocessing.remove_duplicates_verbose(df)

        print("remoced duplicates etc")

        # Split
        X = dataPreprocessing.get_independent_variables(df)
        y = dataPreprocessing.get_dependent_variable(df)
        classes_str = dataPreprocessing.classes(df)

        # Encode
        encode_categorical_variables_str = dataPreprocessing.encode_categorical_variables_verbose(X)
        X = dataPreprocessing.encode_categorical_variables(X)

        # Normalize
        X_normalized, scaler = dataPreprocessing.normalize_data(X)
        normalize_data_str = dataPreprocessing.normalize_data_verbose(X_normalized)

        # Create a new Dataset object for the user
        dataset = Dataset()
        dataset.user = user

        print("dataset saved")
        
        # Get the top features for the dataset
        X_normalized = pd.DataFrame(X_normalized, columns=X.columns)
        top_features, second_image = dataPreprocessing.rank_features(df, X_normalized, y)
        top_features_verbose_str = dataPreprocessing.rank_features_verbose(top_features)
        top_features_alt = dataPreprocessing.altTextRank(top_features)
        
        # Assign values to dataset attributes
        dataset.top_features_data = pickle.dumps(top_features)
        dataset.X_normalized_data = pickle.dumps(X_normalized)
        dataset.y_data = pickle.dumps(y)
        dataset.scaler = pickle.dumps(scaler)

        print("done")
        
        
        # Save the dataset to the database
        try:
            print("saving dataset")
            dataset.save()
            print("dataset saved")
        except Exception as e:
            print(e)
            print("duplicate")



        # Include the encoded image data in the response data
        # Return JsonResponse containing strings to be sent to the frontend
        response_data = {
            'dataset_info': dataset_info_str,
            'is_classification': is_classification_str,
            'preview_data': preview_data_str,
            'check_missing_values': check_missing_values_str,
            'check_infinite_values': check_infinite_values_str,
            'check_duplicates': check_duplicates_str,
            'drop_rows': drop_rows_str,
            'remove_missing_values': remove_missing_values_str,
            'remove_infinite_values': remove_infinite_values_str,
            'remove_duplicates': remove_duplicates_str,
            'classes': classes_str,
            'encode_categorical_variables': encode_categorical_variables_str,
            'normalize_data': normalize_data_str,
            'top_features': top_features_verbose_str,
            'missing_values_chart': first_image,
            'feature_importance_chart': second_image,
            'top_features_alt': top_features_alt,
            'first_alt_data': first_alt_data,
        }

        return JsonResponse(response_data)

# @login_required
class HyperParameterView(APIView):

    def post(self, request):
        resp = response_template()
        if not request.user.is_authenticated:
            resp['details'] = "User is not authenticated"
            return JsonResponse(resp)

        # Fetch user ID
        user = User.objects.get(id=request.user.id)
        
        # Fetch the user's dataset
        dataset = Dataset.objects.get(user=user)
            
        # Build a new MLP neural network object based on the new hyperparameters
        numNeurons_str = request.POST.get('numNeurons')
        numNeurons = json.loads(numNeurons_str)
        actFunc = request.POST['actFunc']
        solver = request.POST['solver']
        lrInit = float(request.POST['lrInit'])
            ### We may need to save the above as attributes of the model NeuralNetwork

        mlp = hyperparameterTuning.build_neural_network(numNeurons, actFunc, solver, lrInit, dataset)
            
            # Serialize the new MLP neural network object and update the existing neural network object in the database
        #create a new neural network object
        nn = NeuralNetwork(user=user, dataset=dataset)
        nn.neural_network = pickle.dumps(mlp)
        #Transfer over the scaler object and the top_features before it gets deleted. This will be needed in MyLab 
        nn.scaler = dataset.scaler
        nn.top_features_data = dataset.top_features_data
        nn.save() 

        resp['success'] = True
        return JsonResponse(resp)


# @login_required
class TrainingAndEvalView(APIView):
# This code defines a class called TrainingAndEvalView which inherits from Django's APIView class. The main function in this class is the post method which first gets the user and their dataset object from the request. It then loads the trained neural network model and trains it. The trained model is then stored back into the database.
# If the target variable of the dataset is of object type, then the performance metrics such as accuracy, precision, recall and f1 are computed and a bar chart of these metrics is plotted using matplotlib. The bar chart is then encoded in base64 format and passed to the frontend along with the performance metrics.
# If the target variable is not of object type, then the mean absolute error (mae) and the residuals are computed and a histogram of the residuals is plotted using Seaborn. The histogram is then encoded in the base64 format and passed along with the mae variable to the frontend. Finally, the function renders the evaluation.html template with the relevant context.

    def post(self, request):
        if not request.user.is_authenticated:
            resp = response_template()
            resp['details'] = "User is not authenticated"
            return JsonResponse(resp)

        user = User.objects.get(id=request.user.id)

        dataset = Dataset.objects.get(user=user)
        y = dataset.get_y()

        #Get the most recent neural network object associated with the user and dataset
        nn = NeuralNetwork.objects.filter(user=user, dataset=dataset).order_by('-neural_network_id').first()

        #Deserialize the MLP stored in the neural network object
        mlp = nn.get_neural_network()
        
        #Train the neural network. The trained neural network object and the performance metrics are returned
        trained_mlp, metrics = modelTraining.train_model(mlp, dataset)

        #Serialize the newly trained MLP neural network object and update the existing neural network object in the database
        nn.neural_network = pickle.dumps(trained_mlp)
        nn.performance_metrics = pickle.dumps(metrics)
        nn.save()

        if y.dtype == 'object':
            accuracy = metrics[0]
            precision = metrics[1]
            recall = metrics[2]
            f1 = metrics[3]

            x_labels = ['Accuracy', 'Precision', 'Recall', 'F1']
            y_values = [metrics[0], metrics[1], metrics[2], metrics[3]]

           # Create a color map for the bars
            #cmap = plt.get_cmap('viridis')
            #colors = cmap(np.linspace(0, 1, len(x_labels)))
            from matplotlib.colors import LinearSegmentedColormap

            # Define a custom colormap that goes from turquoise to bluish turqouise
            colors = ['#40E0D0', '#00CED1']
            cmap = LinearSegmentedColormap.from_list('my_cmap', colors, N=len(x_labels))

            # Create the bar chart
            fig, ax = plt.subplots()
            # ax.bar(x_labels, y_values, color=colors)
            ax.bar(x_labels, y_values, color=colors, edgecolor='white', linewidth=1.2)

            for i, v in enumerate(y_values):
                ax.text(i, v + 0.01, str(round(v, 2)), ha='center', fontsize=12, color='white')
            ax.set_ylabel('Score', fontsize=14, color='white')
            ax.set_title('Performance Metrics on Test Data', fontsize=16, color='white')

            # Set background color
            ax.set_facecolor('black')
            fig.patch.set_facecolor('black')
            # Add a grid to the chart
            # ax.grid(axis='y', linestyle='--', alpha=0.7)
            ax.grid(axis='y', linestyle='solid', alpha=0.7)

            ax.tick_params(axis='x', colors='white')
            ax.tick_params(axis='y', colors='white')

            # Adjust the spacing between the bars and the axis labels
            plt.subplots_adjust(left=0.1, bottom=0.2, right=0.9, top=0.9, wspace=0.4, hspace=0.4)

            buffer = BytesIO()
            fig.savefig(buffer, format='png')
            buffer.seek(0)
            image_data = buffer.getvalue()
            encoded_image = base64.b64encode(image_data).decode('utf-8')

            accuracy_str = "{:.2%} ".format(accuracy)
            precision_str = "{:.2%} ".format(precision)
            recall_str = "{:.2%} ".format(recall)
            f1_str = "{:.2%} ".format(f1)

            alt_text = "accuracy: {}, precision: {}, recall {}, f1 {}".format(accuracy_str, precision_str, recall_str, f1_str)

            accuracy_explanation = "Accuracy: The percentage of right predictions out of all predictions made."
            precision_explanation = "Precision: A high precision score means that the model has a low number of false positives."
            recall_explanation = "Recall: A high recall score means that the model has a low number of false negatives."
            f1_explanation = "F1: A single value combining precision and recall, showing the balance between the two."


            context = {
                'accuracy': accuracy_str,
                'precision': precision_str,
                'recall': recall_str,
                'f1': f1_str,
                'plot': encoded_image,
                'accuracy_explanation': accuracy_explanation,
                'precision_explanation': precision_explanation,
                'recall_explanation': recall_explanation,
                'f1_explanation': f1_explanation,
                'alt_text': alt_text
            }
            accuracy_str = "Accuracy Score: {:.2%}, ".format(accuracy)
            precision_str = "Precision Score: {:.2%}, ".format(precision)
            recall_str = "Recall Score: {:.2%}, ".format(recall)
            f1_str = "F1 Score: {:.2%} ".format(f1)
            metrics = [accuracy_str, precision_str, recall_str, f1_str]
            nn.performance_metrics = pickle.dumps(metrics)
            nn.save()

            return JsonResponse(context)



        else:

            mae = metrics[0]
            residuals = metrics[1]

            # plt.figure(figsize=(10, 6)) # increase figure size
            # plt.hist(residuals, bins=20)
            # plt.xlabel('Residual')
            # plt.ylabel('Frequency')
            # plt.title('Residual Histogram on Test Data')
            # plt.figure(figsize=(10, 6))  # increase figure size

            from matplotlib.colors import LinearSegmentedColormap

            # Define the colors and create the colormap
            colors = ['#40E0D0', '#00CED1']
            cmap = LinearSegmentedColormap.from_list('my_cmap', colors, N=20)

            plt.figure(figsize=(10, 6))  # increase figure size

            # Create an array of colors based on the number of bins
            bin_colors = cmap(np.linspace(0, 1, 20))

            n, bins, patches = plt.hist(residuals, bins=20)

            # Assign colors to the bars from the custom colormap
            for i, p in enumerate(patches):
                p.set_facecolor(bin_colors[i])
                p.set_edgecolor('white')
                p.set_linewidth(1.2)

            plt.xlabel('Residual')
            plt.ylabel('Frequency')
            plt.title('Residual Histogram on Test Data')

            # Set background color
            ax = plt.gca()
            ax.set_facecolor('black')
            
            ax.grid(axis='y', linestyle='solid', alpha=0.7)
            
            
            ax.tick_params(axis='x', colors='white')
            ax.tick_params(axis='y', colors='white')

            # Adjust the font color of labels and title
            ax.xaxis.label.set_color('white')
            ax.yaxis.label.set_color('white')
            ax.title.set_color('white')

            # Save the histogram as a PNG image in memory
            buffer = BytesIO()
            plt.savefig(buffer, format='png', facecolor='black')
            buffer.seek(0)

            # Encode the image in base64 format for transmission to the frontend
            image_png = buffer.getvalue()
            buffer.close()
            encoded_image = base64.b64encode(image_png).decode('utf-8')
            mae_str = "{:.2f}".format(mae)
            # Render the evaluation page with the MAE and histogram image
            mae_explanation = "The mean absolute error (MAE) is the average difference between predicted and actual values, showing how off the predictions were; lower values mean better performance."
            residual_histogram_explanation = "The residual histogram shows the distribution of the residuals. The residuals are the difference between the actual and predicted values. The residuals should be normally distributed with a mean of 0. If the residuals are not normally distributed, then the model is not a good fit for the data."
            context = {
                'mae': mae_str,
                'plot': encoded_image,
                'explanation_MAE': mae_explanation, 
                'explanation_residual_histogram': residual_histogram_explanation,
                'alt_text': "Showing residuals of the regression plot"
            }
            mae_str = "Mean Absolute Error: {}".format(mae)

            #Update performance metrics in the neural network object
            #We do not want residuals to show in my_models table
            metrics = [mae_str]
            nn.performance_metrics = pickle.dumps(metrics)
            nn.save() 

            return JsonResponse(context)
        
        
        #Get function that allows user to choose if they want to save the model or not
        #If yes, then set "delete = False" in the neural network object
        #Otherwise, set delete the neural network object and redirect to hyperparameter tuning page
        #Three buttons: Save, Continue (auto-saves), and Hyperparameter Tuning
        #Redirection to hyperparameter tuning page will delete the neural network object if delete = True
        
from django.views import View
from .models import Dataset, NeuralNetwork
from django.http import HttpResponse

# @login_required
class PostEvaluationView(View):
    def post(self, request):
        if not request.user.is_authenticated:
            resp = response_template()
            resp['details'] = "User is not authenticated"
            return JsonResponse(resp)

        action = request.POST.get("action", None)

        if action == "save_and_retrain":
            return self.save_and_retrain(request)
        elif action == "discard_and_retrain":
            return self.discard_and_retrain(request)
        elif action == "save_and_continue":
            return self.save_and_continue(request)

    def save_and_retrain(self, request):
        user = User.objects.get(id=request.user.id)
        dataset = Dataset.objects.get(user=user)
        nn = NeuralNetwork.objects.filter(user=user, dataset=dataset).order_by('-neural_network_id').first()

        nn_name = request.POST["nn_name"]
        nn.name = nn_name.encode('utf-8')
        nn.save()

        return HttpResponse('/hyperparameter-tuning')

    def discard_and_retrain(self, request):
        user = User.objects.get(id=request.user.id)
        dataset = Dataset.objects.get(user=user)
        nn = NeuralNetwork.objects.filter(user=user, dataset=dataset).order_by('-neural_network_id').first()

        nn.delete()

        return HttpResponse('/hyperparameter-tuning')

    def save_and_continue(self, request):
        user = User.objects.get(id=request.user.id)
        dataset = Dataset.objects.get(user=user)
        nn = NeuralNetwork.objects.filter(user=user, dataset=dataset).order_by('-neural_network_id').first()

        nn_name = request.POST["nn_name"]
        nn.name = nn_name.encode('utf-8')
        nn.save()
        
        #delete the dataset
        dataset.delete()

        return HttpResponse('/mylab')

# @method_decorator(csrf_protect, name='dispatch')
# class TMPModelsView(APIView):
#     def get(self, request):


@method_decorator(csrf_protect, name='dispatch')
class MyModelsView(APIView):
    def get(self, request, format=None):
        if not request.user.is_authenticated:
            resp = response_template()
            resp['details'] = "User is not authenticated"
            return JsonResponse(resp)

        user = User.objects.get(id=request.user.id)

        return_data = []

        networks = NeuralNetwork.objects.filter(user=user)

        for n in networks:
            try:
                p = n.get_performance_metrics()
            except:
                p = ""
            if not n.name:
                n.delete()
            else:
                return_data.append(
                    {
                        'id': n.neural_network_id,
                        'name': n.name,
                        'perf': p,
                    }
                )

        return Response(return_data)

    def post(self, request, format=None):
        # This function will delete the model with the ID given
        resp = response_template()
        if not request.user.is_authenticated:
            resp['details'] = "The user is not logged in"
            return JsonResponse(resp)

        user = User.objects.get(id=request.user.id)
        print("got here")

        nn_id = self.request.data['nn_id']
        print("the nn id is:", nn_id)

        try:
            nn = NeuralNetwork.objects.get(neural_network_id=nn_id)
        except NeuralNetwork.DoesNotExist:
            nn = None
        
        if not nn:
            resp['details'] = "The desired model doesn't exist"
            return JsonResponse(resp)

        if nn.user != user:
            resp['details'] = "The current user doesn't own this model"
            return JsonResponse(resp)

        try:
            nn.delete()
            resp['success'] = True
            return JsonResponse(resp)
        except:
            resp['details'] = "An error occurred whilst trying to delete the model"
            return JsonResponse(resp)


@method_decorator(csrf_protect, name='dispatch')
class MakePredictions(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            resp = response_template()
            resp['details'] = "User is not authenticated"
            return JsonResponse(resp)

        print("start request")
        resp = response_template()
        # Get the selected neural network
        neural_network_id = request.data['neural_network']
        print("nn id: " + neural_network_id)
        nn = NeuralNetwork.objects.get(neural_network_id=neural_network_id)

        user = User.objects.get(id=request.user.id)

        # Check if the model can be accessed by the user attempting to access it
        if nn.user == user:
            try:
                mlp = nn.get_neural_network()
                scaler = nn.get_scaler()
                top_features = nn.get_top_features()
                top_feature_names = [feature[0] for feature in top_features]

                # import standard scaler
                from sklearn.preprocessing import StandardScaler, MinMaxScaler

                # Read the uploaded CSV file
                # dataset = request.FILES['dataset']
                dataset = request.data['file']
                # Get the data to make predictions
                X = pd.read_csv(dataset)
                # Create a copy of the original data
                X_orig = X.copy()
                # Clean and transform the data
                X = dataPreprocessing.remove_missing_values(X)
                X_orig = dataPreprocessing.remove_missing_values(X_orig)
                X = dataPreprocessing.remove_infinite_values(X)
                X_orig = dataPreprocessing.remove_infinite_values(X_orig)
                # X = dataPreprocessing.remove_duplicates(X)
                # X_orig = dataPreprocessing.remove_duplicates(X_orig)
                X = dataPreprocessing.encode_categorical_variables(X)
                # Save the column names before transforming the data
                column_names = X.columns
                X = scaler.transform(X)
                # Use the saved column names when creating the new dataframe
                X = pd.DataFrame(X, columns=column_names)
                X = X[top_feature_names]

                # Make predictions and add them to the copy of the original data
                y_pred = mlp.predict(X)
                X_orig['predictions'] = y_pred

                # Save the updated dataframe as a CSV file
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = 'attachment; filename="predictions.csv"'
                X_orig.to_csv(path_or_buf=response, index=False)

                print("request finished")

                return response
            except:
                resp['details'] = "An error has occurred, please try again"
                return JsonResponse(resp)
        else:
            # The user doesn't have permission
            resp = response_template()
            resp['details'] = "You don't have permission to access this model"
            return JsonResponse(resp)

        # reg_perf = "MAE: {}"
        # class_perf = "Accuracy: {}%, Precision: {}%, Recall: {}, F1: {}"
        # user = User.objects.get(id=request.user.id)
        #
        # # user_models = Model.objects.filter(user=user)
        #
        # return_data = []
        #
        # user_models = Model.objects.filter(user=user)
        #
        # for m in user_models:
        #     match m.type:
        #         case 'CL':
        #             perf = class_perf.format(m.accuracy, m.precision, m.recall, m.F1)
        #         case 'RE':
        #             perf = reg_perf.format(m.MAE)
        #         case _:
        #             perf = ""
        #
        #     return_data.append({
        #         'id': m.modelID,
        #         'desc': m.description,
        #         'name': m.name,
        #         'type': m.type,
        #         'perf': perf,
        #     })



#         return Response(return_data)


# # @method_decorator(csrf_protect, name='dispatch')
# # class MyModelsView(APIView):
# def my_models(request):
#     if request.method == 'POST':
#         # Get the selected neural network
#         neural_network_id = request.POST['neural_network']
#         nn = NeuralNetwork.objects.get(neural_network_id=neural_network_id)
#         mlp = nn.get_neural_network()
#         scaler = nn.get_scaler()
#         top_features = nn.get_top_features()
#         top_feature_names = [feature[0] for feature in top_features]
#
#         #import standard scaler
#         from sklearn.preprocessing import StandardScaler, MinMaxScaler
#
#         # Read the uploaded CSV file
#         dataset = request.FILES['dataset']
#         # Get the data to make predictions
#         X = pd.read_csv(dataset)
#         # Create a copy of the original data
#         X_orig = X.copy()
#         # Clean and transform the data
#         X = dataPreprocessing.remove_missing_values(X)
#         X_orig = dataPreprocessing.remove_missing_values(X_orig)
#         X = dataPreprocessing.remove_infinite_values(X)
#         X_orig = dataPreprocessing.remove_infinite_values(X_orig)
#         X = dataPreprocessing.remove_duplicates(X)
#         X_orig = dataPreprocessing.remove_duplicates(X_orig)
#         X = dataPreprocessing.encode_categorical_variables(X)
#         # Save the column names before transforming the data
#         column_names = X.columns
#         X = scaler.transform(X)
#         # Use the saved column names when creating the new dataframe
#         X = pd.DataFrame(X, columns=column_names)
#         X = X[top_feature_names]
#
#         # Make predictions and add them to the copy of the original data
#         y_pred = mlp.predict(X)
#         X_orig['predictions'] = y_pred
#
#         # Save the updated dataframe as a CSV file
#         response = HttpResponse(content_type='text/csv')
#         response['Content-Disposition'] = 'attachment; filename="predictions.csv"'
#         X_orig.to_csv(path_or_buf=response, index=False)
#
#         return response
#     else:
#         # Get the current user's neural networks
#         neural_networks = NeuralNetwork.objects.filter(user=request.user)
#         # Deserialize the performance_metrics field for each neural network
#         neural_networks_data = []
#         for nn in neural_networks:
#             nn_data = {
#                 'neural_network_id': nn.neural_network_id,
#                 'name': nn.name,
#                 'performance_metrics': nn.get_performance_metrics()
#             }
#             neural_networks_data.append(nn_data)
#         # Render the template with the deserialized neural network data
#         return render(request, 'main/my_models.html', {'neural_networks': neural_networks_data})