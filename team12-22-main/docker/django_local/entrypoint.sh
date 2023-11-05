#!/bin/bash

pip install -r requirements.txt

python manage.py makemigrations --no-input --settings=TeamProject.settings.dev
python manage.py migrate --no-input --settings=TeamProject.settings.dev

python -u manage.py runserver 0.0.0.0:8000 --settings=TeamProject.settings.dev
