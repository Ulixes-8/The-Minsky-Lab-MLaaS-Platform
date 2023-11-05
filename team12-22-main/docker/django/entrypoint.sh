#!/bin/bash

python manage.py makemigrations --no-input --settings=TeamProject.settings.prod
python manage.py migrate --no-input --settings=TeamProject.settings.prod
python manage.py collectstatic --no-input --settings=TeamProject.settings.prod

gunicorn TeamProject.wsgi:application --bind 0.0.0.0:8000 --timeout 600 --graceful-timeout 600
