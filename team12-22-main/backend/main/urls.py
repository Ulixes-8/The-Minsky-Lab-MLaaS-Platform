from django.urls import path
from .views import *


app_name = 'main'
urlpatterns = [
    # Utility views
    path('csrf-cookie/', GetCSRFToken.as_view()),
    # User auth views
    path('sign-up/', UserSignupView.as_view()),
    path('user-auth/', UserAuthenticatedView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
    # API handling views
    path('file-upload/', FileUpload.as_view()),
    path('preprocess/', PreprocessingView.as_view()),
    path('models/', MyModelsView.as_view()),
    # tmp
    path('profile/', ViewUser.as_view()),
    path('predict/', MakePredictions.as_view()),
    path('tmp/', TMPView.as_view()),
    # path('tmp2/', TMP2.as_view()),
    path('user/', ViewAllUsers.as_view()),
    # path('cm/', ModelCreate.as_view()),
    path('hyperparameter-tuning/', HyperParameterView.as_view()),
    path('trainingAndEval/', TrainingAndEvalView.as_view()),
    path('post-evaluation/', PostEvaluationView.as_view()),
    # path('my-models/', my_models, name='models'),
    path('vo/', VOTest.as_view()),
    #path('make-predictions/', make_predictions),

    
]
