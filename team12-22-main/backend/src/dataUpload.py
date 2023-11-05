""" Title: Data Upload Feature

Description: The data upload feature will allow users to upload their own datasets into the 
Minsky Lab platform for use in machine learning models. The feature will support CSV, and will 
include tools for previewing, validating, and cleaning the data before uploading it to the 
platform.

Acceptance Criteria:
• Users should be able to upload datasets in CSV format.
• The platform should validate that the uploaded data does not have missing values, null 
values, duplicates, or infinite values. Inform the user of validation results. 
• The platform should display a preview of the uploaded data, including column headers
and data types.
• The data upload process should be secure and encrypted to protect user data by sanitizing the file input, 
preventing unauthorized access and limiting the size of the file.

Effort Estimation: 3 story points

Justification: The data upload feature is a crucial component of the Minsky Lab platform, 
enabling users to work with their own data and develop custom machine learning models. The 
feature requires careful design and implementation to ensure that the data is validated and 
cleaned before being uploaded to the platform, and that the upload process is secure and reliable. 
The feature should take approximately 3 story points to complete, including design, 
implementation, and testing.

"""

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt


def is_classification_verbose(df):
    if df.iloc[:,-1].dtype == 'object':
        response = "Your dataset indicates that the problem you're trying to solve is a classification problem, meaning your goal, given an example, is to classify it into a specific category.\n\n"
        
        return response
    response = "Your dataset indicates that the problem you're trying to solve is a regression problem, meaning your goal, given an example, is to predict a continuous value.\n\n"
    return response

#Here is information about your dataset
def dataset_info(df):
    response = f"Your dataset has {df.shape[0]} rows and {df.shape[1]} columns.\n\n"
    return response

#Display a preview of the uploaded data, including column headers and data types.
def preview_data(df):
    response = f"{df.head(10).to_string()}\n\n"
    return response 

#Report the number of missing values in the dataset.
def check_missing_values(df):
    response = f"\nThere are {df.isnull().sum().sum()} missing or null values in the dataset."
    return response

#Check for duplicates. 
def check_duplicates(df):
    response = f"There are {df.duplicated().sum()} duplicates in the dataset."
    return response
#Check for infinite values. 
def check_infinite_values(df):
    response = f"There are {df.isin([np.inf, -np.inf]).sum().sum()} infinite values in the dataset."
    return response 


#Tell the user that rows containing missing, null, infinite, or duplicate values will be dropped.
def drop_rows(df):
    return "We will now drop all rows containing missing, null, infinite, or duplicate values to maximize the performance of the models.\n\n"


def data_upload(df):
    dataset_info(df)
    is_classification_verbose(df)
    preview_data(df)
    check_missing_values(df)
    check_infinite_values(df)
    check_duplicates(df)
    drop_rows(df)

