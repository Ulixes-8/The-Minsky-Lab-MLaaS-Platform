import pandas as pd 
import numpy as np

df = pd.read_csv("C:/Users/ulixe/OneDrive/Desktop/Team Project Paperwork and Shit/TestingDatasets/Dubai Rental Contracts 2023.csv")

#All of the necessary imports
import src.dataUpload
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from io import BytesIO
import base64

def first_image_generator(df):
    number_of_missing_values = df.isnull().sum().sum()
    number_of_duplicates = df.duplicated().sum()
    number_of_infinity_values = (df == np.inf).sum().sum()
    from matplotlib.colors import LinearSegmentedColormap

    # Define the colors and create the colormap
    colors = ['#40E0D0', '#00CED1']
    cmap = LinearSegmentedColormap.from_list('my_cmap', colors, N=3)

    plt.figure(figsize=(10, 5))
    plt.style.use('dark_background')

    # Create an array of colors based on the number of bars
    bar_colors = cmap(np.linspace(0, 1, 3))

    # Create the bar chart with a smaller width for each bar
    bars = plt.bar(['Missing Values', 'Duplicates', 'Infinite Values'],
                [number_of_missing_values, number_of_duplicates, number_of_infinity_values],
                color=bar_colors, width=0.3)
    plt.title('Number of Missing Values, Duplicates, and Infinite Values')

    # Set background color and adjust the font color of labels and title
    ax = plt.gca()
    ax.set_facecolor('black')

    ax.grid(axis='y', linestyle='', alpha=0.7)

    ax.tick_params(axis='x', colors='white')
    ax.tick_params(axis='y', colors='white')
    ax.xaxis.label.set_color('white')
    ax.yaxis.label.set_color('white')
    ax.title.set_color('white')

    # Add the values at the top of each bar
    for bar in bars:
        height = bar.get_height()
        x = bar.get_x() + bar.get_width() / 2
        ax.text(x, height, f'{height}', ha='center', va='bottom', color='white')

    # Save the chart as a PNG image in memory
    buf = BytesIO()
    plt.savefig(buf, format="png", bbox_inches='tight', dpi=100, facecolor='k')
    buf.seek(0)

    # Encode the image data as a base64 string
    encoded_image_data = base64.b64encode(buf.getvalue()).decode("utf-8")


    return encoded_image_data   

#if the final column of that file is categorical, then we are doing classification
def is_classification(df):
    if df.iloc[:,-1].dtype == 'object':
        return True
    return False

#split the data into X and y (features and target)
def get_independent_variables(df):
    X = df.iloc[:,:-1]
    return X

def get_dependent_variable(df):
    y = df.iloc[:,-1]
    return y

def classes(df):
    if is_classification(df):
        response = f"The possible categories we can predict for any given example are: {df.iloc[:,-1].unique()}"     
    else: 
        response = "This is a regression problem, so there are no classes."
    return response

#remove rows with missing values or null values
def remove_missing_values(df):
    df = df.dropna()
    return df

def remove_missing_values_verbose(df):
    response = "We've dropped all rows with missing values. Your dataset now has ", len(df), " rows. \n \n"
    return response

#remove rows with infinite values
def remove_infinite_values(df):
    df = df.replace([np.inf, -np.inf], np.nan)
    df = df.dropna()
    return df

def remove_infinite_values_verbose(df):
    response = "We've dropped all rows with infinite values. Your dataset now has ", len(df), " rows. \n \n"
    return response

#remove duplicate rows
def remove_duplicates(df):
    df = df.drop_duplicates()
    return df

def remove_duplicates_verbose(df):
    response = "We've dropped all duplicate rows. Your dataset now has ", len(df), " rows. \n \nYour dataset is now clean! \n \n"
    return response

#number of categorical variables
def num_categorical_variables(df):
    return len(df.select_dtypes(include=['object']).columns)
        
#Encode categorical variables. Use one hot encoding if there are less than 15 categories, otherwise use label encoding.
def encode_categorical_variables(df):
    from sklearn.preprocessing import LabelEncoder
    encoder = LabelEncoder()
    
    for column in df:
        if df[column].dtype == 'object':
            df[column] = encoder.fit_transform(df[column])
                
                
    return df



def encode_categorical_variables_verbose(df):
    num_categorical = num_categorical_variables(df)
    response = "Neural Networks can only understand numeric inputs, so we needed to encode your non-numeric variables.  \n \nThere were {} non-numeric variables in your dataset. We've encoded them for you. \n \n".format(num_categorical)
    return response

#normalize the data using standard scaler
def normalize_data(df):
    from sklearn.preprocessing import MinMaxScaler
    scaler = MinMaxScaler()

    # from sklearn.preprocessing import StandardScaler
    # scaler = StandardScaler()
    scaler.fit(df) 
    df = scaler.transform(df)
    return df, scaler ##Must return the scaler so that we can use it to normalize wild data 

def normalize_data_verbose(df):
    response = f"""
    We need to normalize data to rescale the values to a common range and prevent any one variable from dominating the analysis or having undue influence on the results. \n \nWe've normalized your data and it is now ready to use for training your very own neural network!"""
    return response 


#Rank the features based on their importance to the model using random forest importances
def rank_features(df, X, y):
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.ensemble import RandomForestRegressor
    if is_classification(df):
        clf = RandomForestClassifier(n_jobs=2, n_estimators=100, max_depth=10, random_state=42)
        clf.fit(X, y)
        importances = clf.feature_importances_
    else:
        reg = RandomForestRegressor(n_jobs=2, n_estimators=100, max_depth=10, random_state=42)
        reg.fit(X, y)
        importances = reg.feature_importances_
    indices = np.argsort(importances)[::-1]
    top_features = []
    for f in range(X.shape[1]):
        if importances[indices[f]] > 0.01:
            top_features.append((X.columns[indices[f]], importances[indices[f]])) # Use X.columns instead of df.columns
            
    top_features = sorted(top_features, key=lambda x: x[1], reverse=True)
    
    from matplotlib.colors import LinearSegmentedColormap

    # Define the colors and create the colormap
    colors = ['#40E0D0', '#00CED1']
    cmap = LinearSegmentedColormap.from_list('my_cmap', colors, N=20)

    plt.figure(figsize=(10, 5))
    plt.style.use('dark_background')

    # Create an array of colors based on the number of bars
    bar_colors = cmap(np.linspace(0, 1, len(top_features)))

    plt.title("Most Important Features By Feature Importance")
    bars = plt.barh(range(len(top_features)), [val[1] for val in top_features], color=bar_colors, align="center")
    plt.yticks(range(len(top_features)), [val[0] for val in top_features])
    plt.xlim([0, 1])
    plt.tight_layout()

    # Set background color and adjust the font color of labels and title
    ax = plt.gca()
    ax.set_facecolor('black')

    ax.grid(axis='x', linestyle='solid', alpha=0.7)

    ax.tick_params(axis='x', colors='white')
    ax.tick_params(axis='y', colors='white')
    ax.xaxis.label.set_color('white')
    ax.yaxis.label.set_color('white')
    ax.title.set_color('white')

    # Add the values at the top of each bar
    for bar in bars:
        width = bar.get_width()
        y = bar.get_y() + bar.get_height() / 2
        ax.text(width, y, f'{width:.2f}', ha='left', va='center', color='white')

    # Save the chart as a PNG image in memory
    buffer = BytesIO()
    plt.savefig(buffer, format='png', bbox_inches='tight', dpi=100, facecolor='k')
    buffer.seek(0)

    # Encode the image in base64 format for transmission to the frontend
    image_png = buffer.getvalue()
    buffer.close()
    encoded_image = base64.b64encode(image_png).decode('utf-8')



    
    return top_features, encoded_image #Return the top features and the encoded image


def rank_features_verbose(top_features):
    response = "Knowing the most important features of your dataset is crucial for making informed business decisions, reducing risks, optimizing performance, and driving innovation, by identifying the most important factors that contribute to business outcomes. Below are the most important features in your dataset for predicting the target variable (the things in the last column) ranked by 'feature importance'. The higher the number, the more important the feature. \n \n"
    # for feature_name, importance in top_features:
    #     response += f"{feature_name} has an importance of {importance} \n"
    return response


def pre_process(df):
    
    #Clean
    df = df.fillna(df.mean(), inplace=True)

    
    df = remove_infinite_values(df)
    
    df = remove_duplicates(df)
    
    #Split
    X = get_independent_variables(df)
    y = get_dependent_variable(df)
    
    #Encode
    X = encode_categorical_variables(X)
    
    #Normalize
    X_normalized = normalize_data(X)
    
    X_normalized = pd.DataFrame(X_normalized, columns=X.columns)

    
    #Return the pre-processed data
    return X_normalized, y

