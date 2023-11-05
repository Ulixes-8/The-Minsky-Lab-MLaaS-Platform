from django.db import models
from django.contrib.auth.models import User
import pickle


# This code defines two Django models, Dataset and NeuralNetwork, and uses the models module in Django to define the fields for each model. The User model is also imported from the standard Django authentication models. The pickle module is used to encode and decode binary data for storing in the models.
# The Dataset model has four fields: dataset_id (an auto-incrementing primary key), user (a foreign key to the User model), top_features_data (a binary field that stores a pickled representation of top features data), X_normalized_data (a binary field that stores a pickled representation of normalized X data), and y_data (a binary field that stores a pickled representation of y data). 
# The Dataset model also has three methods, get_top_features, get_X_normalized, and get_y, which are used to decode the binary data stored in the top_features_data, X_normalized_data, and y_data fields, respectively.
# The NeuralNetwork model has five fields: neural_network_id (an auto-incrementing primary key), user (a foreign key to the User model), dataset (a foreign key to the Dataset model), neural_network (a binary field that stores a pickled representation of a neural network object), and performance_metrics (a binary field that stores a pickled representation of a dictionary of performance metrics).
# The NeuralNetwork model has one method, get_neural_network, which is used to decode the binary data stored in the neural_network field.
# The NeuralNetwork model also has a commented-out field, performance_metrics, which could be used to store performance metrics data as a binary field. 
# The code uses Django's object-relational mapping (ORM) to automatically create a database schema based on the model definitions.

MODEL_TYPES = (
    ('RE', 'Regression'),
    ('CL', 'Classification'),
)


class Dataset(models.Model):
    
    dataset_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, unique=True) # Unique constraint added
    top_features_data = models.BinaryField(null=True, blank=True) 
    X_normalized_data = models.BinaryField(null=True, blank=True)
    y_data = models.BinaryField(null=True, blank=True)
    scaler = models.BinaryField(null=True, blank=True)

    
    def get_top_features(self):
        # Returns the top features data
        return pickle.loads(self.top_features_data)

    def get_X_normalized(self):
        # Returns the normalized X data
        return pickle.loads(self.X_normalized_data)

    def get_y(self):
        # Returns the y data
        return pickle.loads(self.y_data)
    
    def get_scaler(self):
        # Returns the scaler object
        return pickle.loads(self.scaler)
    
    
class NeuralNetwork(models.Model):
    neural_network_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    dataset = models.ForeignKey(Dataset, on_delete=models.SET_NULL, null=True, default=None)
    neural_network = models.BinaryField(null=True, blank=True)
    performance_metrics = models.BinaryField(null=True, blank=True)
    name = models.BinaryField(null=True, blank=True)
    scaler = models.BinaryField(null=True, blank=True)
    top_features_data = models.BinaryField(null=True, blank=True) 

    def get_neural_network(self):
        # Returns the neural network object
        return pickle.loads(self.neural_network)
    
    def get_performance_metrics(self):
        return pickle.loads(self.performance_metrics)
    
    def get_name(self):
        return pickle.loads(self.name)
    
    #You must get this information from the dataset before it is deleted. 
    def get_scaler(self):
        # Returns the scaler object
        return pickle.loads(self.scaler)
    
    def get_top_features(self):
        # Returns the top features data
        return pickle.loads(self.top_features_data)


# class ModelType(models.Model):
#     typeID = models.IntegerField(primary_key=True)  # Unique ID for each model type
#     modelType = models.CharField(max_length=50, choices=MODEL_TYPES)  # Either Regression or Classification

# class Model(models.Model):
#     modelID = models.AutoField(primary_key=True) #Unique ID for each model
#     type = models.CharField(max_length=2, choices=MODEL_TYPES, default='RE')
#     # type = models.ForeignKey(ModelType, on_delete=models.PROTECT, default=None) #Regression or Classification
#     user = models.ForeignKey(User, on_delete=models.CASCADE, default=None) #Foreign Key
#     description = models.CharField(max_length=1000) # User can describe model
#     name = models.CharField(max_length=50, null = False, blank=False) #User can name model
#     # The model is serialized and stored in the database using pickle. When it is retrieved, it is deserialized and used.
#     model = models.BinaryField(unique=True, null=False, blank=False)
#     accuracy = models.CharField(max_length=50, null=True, blank=True) #Accuracy for classification models
#     precision = models.CharField(max_length=50, null=True, blank=True) #Precision for classification models
#     recall = models.CharField(max_length=50, null=True, blank=True) #Recall for classification models
#     F1 = models.CharField(max_length=50, null=True, blank=True) #F1 score for classification models
#     MAE = models.CharField(max_length=50, null=True, blank=True) #Mean Absolute Error for regression models
#     dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, default=None) #Foreign Key



#
#
# class TopFeatures(models.Model):
#     featureID = models.AutoField(primary_key=True)
#     feature = models.CharField(max_length=50)
#     importance = models.CharField(max_length=50)
#     dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, default=None)

