# This code defines a function called build_neural_network that uses the MLPClassifier or MLPRegressor class from the scikit-learn library to build a neural network model. The type of model created is determined by the type of the target variable in the input dataset, which is determined using the is_classification function from the dataPreprocessing module.
# To build the model, the function takes in the following inputs: numNeurons (a list specifying the number of neurons in each layer of the model), actFunc (a string specifying the activation function to use), solver (a string specifying the optimization algorithm to use), lrInit (a float specifying the initial learning rate), and dataset (an object representing the input dataset).
# The function first gets the target variable y from the dataset object. It then checks if y is categorical or continuous using the is_classification function. If y is categorical, the function creates an instance of the MLPClassifier class with the specified parameters and returns it. If y is continuous, the function creates an instance of the MLPRegressor class with the specified parameters and returns it.
# Here is the corresponding code for the function in full:


#Import MLPClassifier
from sklearn.neural_network import MLPClassifier, MLPRegressor
from .dataPreprocessing import is_classification

#Pass in the dataset object
def build_neural_network(numNeurons, actFunc, solver, lrInit, dataset):
    
    #Get the target variable
    y = dataset.get_y()
    
    #Check if the target variable is categorical or continuous
    if y.dtype == 'object':
        #Create an instance of the MLPClassifier class
        mlp = MLPClassifier(verbose = True, max_iter = 200, random_state = 42, 
                            early_stopping = True, activation=actFunc, solver=solver, 
                            learning_rate='adaptive', learning_rate_init=lrInit, hidden_layer_sizes=numNeurons)
    #If the target variable is continuous
    else: 
        #   Create an instance of the MLPRegressor class
        mlp = MLPRegressor(verbose = True, max_iter = 200, random_state = 42, 
                        early_stopping = True, activation=actFunc, solver=solver, 
                        learning_rate='adaptive', learning_rate_init=lrInit, hidden_layer_sizes=numNeurons)
    #Return the model
    return mlp 
