
"""
Description:
Will be passed a file uploaded by the user through the view function.
Will make the path for storing the files if it doesn't already exist
Will copy the file into a new file named as "user_id.csv", where the id is the id of the current user
Has functions for deleting the file after use.
"""

import os
import pathlib
import csv
import pandas as pd

import src.dataPreprocessing
import src.dataUpload


# get absolute path of team12-22/userfiles
dirPath = os.path.join(pathlib.Path(__file__).parent.parent, 'userfiles')

# tmp filename
# filePath = os.path.join(dirPath, 'tmp.csv')

# if the path doesn't exist, make it
def make_path():
    if not os.path.exists(dirPath):
        os.makedirs(dirPath)

# copy the file to desired location
def file_handler(file, id):
    make_path()
    filePath = make_file_path(id)
    with open(filePath, 'wb+') as dest:
        for chunk in file.chunks():
            dest.write(chunk)
            
    # df = pd.read_csv(filePath) #Converts the file to a dataframe
    # src.dataUpload.data_upload(filePath) #Runs the data upload page
    # X_normalized, y = src.dataPreprocessing.pre_process(df) #Runs the data preprocessing page
    # top_features = src.dataPreprocessing.rank_features(df, X_normalized, y) #Runs the feature ranking page
    

# delete the tmp file
def clear_upload_file(id):
    filePath = make_file_path(id)
    if os.path.exists(filePath):
        os.remove(filePath)

# returns the absolute path of the file
def make_file_path(id):
    return os.path.join(dirPath, "user_"+str(id)+".csv")

# def check_is_csv(path):
#     try:
#         with open(path, newline='') as file:
#             s = file.read(4096)

