# The code imports necessary libraries for machine learning, such as the Scikit-Learn library used for pre-processing and training the dataset, as well as NumPy and Pandas used for data manipulation. Matplotlib and Seaborn libraries are also used for visualization purposes.
# The train_model() function takes in two parameters: mlp, an MLPClassifier or MLPRegressor object, and dataset, an instance of a custom Dataset class. The function first retrieves the top features, normalized input data, and output data from the dataset object.
# For classification problems, the function uses the 'train_test_split()' function from Scikit-Learn to split the dataset into training and testing sets with a 80:20 ratio. The MLP classifier 'mlp' is then trained on the X_train and y_train data. The accuracy, precision, recall and f1 scores are then calculated on the test data X_test and y_test, which are subsequently saved in a list called metrics, if the output data type is an 'object'.
# For regression problems, the function makes predictions on the validation set X_test using the trained mlp. The mean absolute error (MAE) is then calculated as the average absolute difference between the predicted and actual output values. The results of the prediction process and the MAE are saved in a list called metrics.
# Finally, the trained MLPClassifier/MLPRegressor and metrics list are returned to the caller of the function.

from sklearn.model_selection import train_test_split
import numpy as np 
import pandas as pd
from sklearn.neural_network import MLPClassifier, MLPRegressor
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, mean_absolute_error
import seaborn as sns
import matplotlib.pyplot as plt
from main import models


def train_model(mlp, dataset):
    
    #POTENTIAL BUG: Must be able to use models.py functions, test if imports work.  
    top_features = dataset.get_top_features()
    X_normalized = dataset.get_X_normalized()
    y = dataset.get_y()
    
    #Extract only the names from top_features
    top_feature_names = [feature[0] for feature in top_features]
    X_normalized = X_normalized[top_feature_names] #Drop all the features that are not in the top features list
    #Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X_normalized, y, test_size=0.2, random_state=42)
    
    #Train the model
    trained_mlp = mlp.fit(X_train, y_train)
    # Make predictions on the validation set
    y_pred = trained_mlp.predict(X_test)       
   #If classification
    if y.dtype == 'object':
        #check if binary or multi-class
        if len(np.unique(y)) == 2:
            positive_class = np.unique(y)[1]
            #Calculate the accuracy score
            accuracy = accuracy_score(y_test, y_pred)
            #Calculate the precision score
            precision = precision_score(y_test, y_pred, average='binary', pos_label=positive_class, zero_division=1)
            #Calculate the recall score
            recall = recall_score(y_test, y_pred, average='binary', zero_division=1, pos_label=positive_class)
            #Calculate the f1 score
            f1 = f1_score(y_test, y_pred, average='binary', zero_division=1, pos_label=positive_class)
            #Save the metrics
            metrics = [accuracy, precision, recall, f1]
        else: 
            # Calculate the accuracy score
            accuracy = accuracy_score(y_test, y_pred)
            # Calculate the precision score
            precision = precision_score(y_test, y_pred, average='weighted', zero_division=1)
            # Calculate the recall score
            recall = recall_score(y_test, y_pred, average='weighted', zero_division=1)
            # Calculate the f1 score
            f1 = f1_score(y_test, y_pred, average='weighted', zero_division=1)
            #Save the metrics

            metrics = [accuracy, precision, recall, f1]

    #If regression
    else:
        residuals = y_test - y_pred
        # Calculate the mean absolute error
        mae = mean_absolute_error(y_test, y_pred)
        #Save the metrics        
        metrics = [mae, residuals]
                
        
    #Return the trained model and the metrics
    return trained_mlp, metrics 