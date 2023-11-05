FROM python:3

ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

WORKDIR /app/backend

COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

COPY ./backend/ .

RUN python manage.py makemigrations --no-input --settings=TeamProject.settings.dev
RUN python manage.py migrate --no-input --settings=TeamProject.settings.dev --run-syncdb

CMD python -u manage.py runserver 0.0.0.0:8000 --settings=TeamProject.settings.dev

#COPY ./docker/django_local/entrypoint.sh /
#ENTRYPOINT ["sh", "/entrypoint.sh"]