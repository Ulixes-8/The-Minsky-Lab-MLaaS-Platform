from TeamProject.settings.base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'tp-db',
        'USER': 'django-user',
        'PASSWORD': 'SecurePassword123',
        'PORT': 3306,
        'HOST': '172.31.115.54'
    }
}

FRONTEND_BASE_URL = "https://team12-22.bham.team/"

# STATIC_ROOT = 'static/'

LOGIN_REDIRECT_URL = FRONTEND_BASE_URL
LOGOUT_REDIRECT_URL = FRONTEND_BASE_URL
