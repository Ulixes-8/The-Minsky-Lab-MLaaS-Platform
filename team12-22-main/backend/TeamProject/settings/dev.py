from TeamProject.settings.base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

FRONTEND_BASE_URL = "http://localhost/"

LOGIN_REDIRECT_URL = FRONTEND_BASE_URL
LOGOUT_REDIRECT_URL = FRONTEND_BASE_URL
